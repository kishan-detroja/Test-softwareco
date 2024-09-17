import React, { useEffect } from "react";
import ShowPageTitle from "../common/ShowPageTitle";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import SpinnerButton from "../common/SpinnerButton";
import { estimateForm } from "../../helper/Validation";
import { useDispatch, useSelector } from "react-redux";
import { addEstimates } from "../../redux/estimates/addEstimatesSlice";
import addIcon from "../../assets/images/add-icon.svg";
import removeIcon from "../../assets/images/remove-icon.svg";
import {
  isValidArray,
  isValidObject,
  showErrorMsg,
  showSuccessMsg,
} from "../../helper/utils";
import { useNavigate, useParams } from "react-router";
import { getEstimateDetail } from "../../redux/estimates/getEstimateDetailSlice";
import { updateEstimate } from "../../redux/estimates/updateEstimateSlice";

const EstimateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;
  const isAddEstimateLoading = useSelector(
    (state) => state?.addEstimates?.loading ?? false
  );

  const isupdateEstimateLoading = useSelector(
    (state) => state?.updateEstimate?.loading ?? false
  );
  const estimateDetail = useSelector(
    (state) => state?.getEstimateDetail?.data ?? {}
  );

  const isLoading = isupdateEstimateLoading || isAddEstimateLoading;

  const sectionInitValues = [
    {
      sectionName: "",
      sectionTotal: "",
      sectionMargin: "",
      items: [
        {
          name: "",
          description: "",
          unit: "",
          quantity: "",
          price: "",
          margin: "",
          marginAmount: "",
          total: "",
        },
      ],
    },
  ];

  const initialValues = {
    section: isEdit
      ? estimateDetail?.section ?? sectionInitValues
      : sectionInitValues,
    subTotal: isEdit ? estimateDetail?.subTotal ?? 0 : 0,
    totalMargin: isEdit ? estimateDetail?.totalMargin ?? 0 : 0,
    totalAmount: isEdit ? estimateDetail?.totalAmount ?? 0 : 0,
  };
  const handleSubmit = (values) => {
    const formData = {
      data: values,
      id: id,
    };

    if (isEdit) {
      dispatch(updateEstimate(formData)).then((data) => {
        if (isValidObject(data?.payload)) {
          showSuccessMsg("Estimation added successfully");
          navigate("/estimates");
        } else {
          showErrorMsg();
        }
      });
    } else {
      dispatch(addEstimates(values)).then((data) => {
        if (isValidObject(data?.payload)) {
          showSuccessMsg("Estimation added successfully");
          navigate("/estimates");
        } else {
          showErrorMsg();
        }
      });
    }
  };

  const getTotal = (data = []) => {
    if (isValidArray(data)) {
      const sum = data.reduce((acc, curr) => {
        return acc + curr.total;
      }, 0);
      return sum;
    }

    return 0.0;
  };

  const getSubTotal = (data = []) => {
    if (isValidArray(data.section)) {
      const sum = data.section.reduce((acc, curr) => {
        return acc + curr.sectionTotal;
      }, 0);

      return sum;
    }

    return 0.0;
  };

  const getTotalAmount = (data = []) => {
    if (isValidArray(data.section)) {
      const sum = data.section.reduce((acc, curr) => {
        return (acc += (curr?.sectionTotal ?? 0) + (curr?.totalMargin ?? 0));
      }, 0);

      return sum;
    }

    return 0.0;
  };

  const getFinalTotalMargin = (data = []) => {
    if (isValidArray(data.section)) {
      const sum = data.section.reduce((acc, curr) => {
        return (acc += curr?.sectionMargin ?? 0);
      }, 0);

      return sum;
    }

    return 0.0;
  };

  const updateItems = (val, itemIndex, inputVal, key = "total") => {
    const updatedItems = {
      ...val,
      items: val?.items.map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              [key]: parseFloat(inputVal) || 0,
            }
          : item
      ),
    };
    return updatedItems;
  };

  const updateformValue = (val, index, inputVal, key = "sectionTotal") => {
    const updatedItems = {
      section: val.section.map((item, i) =>
        i === index
          ? {
              ...item,
              [key]: parseFloat(inputVal) || 0,
            }
          : item
      ),
    };
    return updatedItems;
  };

  const calculateTotalMargin = (items) => {
    let totalMargin = 0;

    items.forEach((item) => {
      const { quantity = 0, price = 0, margin = 0 } = item;
      const marginAmount =
        (Number(quantity) * Number(price) * parseFloat(Number(margin))) / 100;
      totalMargin += marginAmount;
    });

    return totalMargin;
  };

  const calculateItemMargin = (items, itemIndex) => {
    let totalMargin = 0;

    items.forEach((item, index) => {
      if (itemIndex === index) {
        const { quantity = 0, price = 0, margin = 0 } = item;
        const marginAmount =
          (Number(quantity) * Number(price) * parseFloat(Number(margin))) / 100;
        totalMargin = marginAmount;
      }
    });

    return totalMargin;
  };

  const handleTotalAmount = (amount1 = 0, amount2 = 0) => {
    return amount1 + amount2;
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getEstimateDetail(id));
    }
  }, []);

  return (
    <div className="h-[90vh]">
      <ShowPageTitle title={"addEstimate"} />
      <h2 className="font-bold text-2xl text-txt-color dark:text-white">
        {isEdit ? "Edit Estimates" : "Add Estimates"}
      </h2>
      <div className="mt-8">
        <Formik
          initialValues={initialValues}
          validationSchema={estimateForm}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ handleChange, values, handleSubmit, setFieldValue }) => {
            const totalAmount = handleTotalAmount(
              values?.subTotal,
              values?.totalMargin
            );
            return (
              <Form
                className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                onKeyDown={(e) => {
                  e.key == "Enter" && e.preventDefault();
                }}
              >
                <div className="grid p-2 py-3 border-b text-center max-w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                  <div className="sm:col-span-2 font-semibold text-sm text-gray-800  border-r">
                    ITEM NAME
                  </div>
                  <div className="font-semibold text-sm text-gray-800 sm:col-span-2 border-r">
                    {" "}
                    ITEM DFSCRIPTION
                  </div>
                  <div className="font-semibold text-sm text-gray-800 sm:col-span-1 border-r">
                    UNIT
                  </div>
                  <div className="font-semibold text-sm text-gray-800 sm:col-span-1 border-r">
                    {" "}
                    QUANTITY
                  </div>
                  <div className="font-semibold text-sm text-gray-800 sm:col-span-1 border-r">
                    {" "}
                    PRICE
                  </div>
                  <div className="font-semibold text-sm text-gray-800 sm:col-span-2 border-r">
                    {" "}
                    MARGIN
                  </div>
                  <div className="font-semibold text-sm text-gray-800 sm:col-span-2 ">
                    {" "}
                    TOTAL
                  </div>
                </div>
                <div className="px-4 py-6 sm:p-8 gap-y-10">
                  <FieldArray name="section" value={values?.section}>
                    {({ insert, remove, push }) => (
                      <div className="mb-10">
                        {values?.section?.length > 0 &&
                          values.section.map((val, index) => {
                            return (
                              <div key={index}>
                                <div className="w-full">
                                  <div className="flex  mt-7 justify-between mb-3">
                                    <div className="flex items-center justify-between gap-x-2">
                                      <button
                                        className=""
                                        type="button"
                                        onClick={() => {
                                          push({
                                            sectionName: "",
                                            sectionTotal: "",
                                            sectionMargin: "",
                                            items: [
                                              {
                                                name: "",
                                                description: "",
                                                unit: "",
                                                quantity: "",
                                                price: "",
                                                margin: "",
                                                marginAmount: "",
                                                total: "",
                                              },
                                            ],
                                          });
                                        }}
                                      >
                                        <img
                                          src={addIcon}
                                          className="h-6 w-6"
                                        />
                                      </button>

                                      <div className="sm:col-span-3">
                                        <div className="mt-2">
                                          <Field
                                            id={`section.${index}.sectionName`}
                                            name={`section.${index}.sectionName`}
                                            type="text"
                                            autoComplete="sectionName"
                                            value={val["sectionName"] ?? ""}
                                            onChange={handleChange}
                                            placeholder="Section Name"
                                            className="input-field p-2"
                                          />
                                        </div>
                                        <ErrorMessage
                                          name={`section.${index}.sectionName`}
                                          component="div"
                                          className="field-error text-red-500"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-x-2">
                                      <div className="sm:col-span-3">
                                        <div className="mt-2 relative">
                                          <Field
                                            id={`section.${index}.sectionTotal`}
                                            name={`section.${index}.sectionTotal`}
                                            type="text"
                                            autoComplete="sectionTotal"
                                            value={val?.["sectionTotal"] ?? ""}
                                            onChange={handleChange}
                                            placeholder="Section Total"
                                            className="input-field p-2"
                                            readOnly={true}
                                          />
                                          <span className="absolute font-bold text-lg text-gray-500 right-2 top-[10%]">
                                            $
                                          </span>
                                        </div>

                                        <ErrorMessage
                                          name={`section.${index}.sectionTotal`}
                                          component="div"
                                          className="field-error text-red-500"
                                        />
                                      </div>
                                      {index > 0 ? (
                                        <button
                                          className=""
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        >
                                          <img
                                            src={removeIcon}
                                            className="h-6 w-6"
                                          />
                                        </button>
                                      ) : (
                                        <div className="w-5"></div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="w-full border-b-2 mb-5"></div>
                                </div>
                                {
                                  <FieldArray
                                    name={`section.${index}.items`}
                                    value={values?.section?.[index]?.items}
                                  >
                                    {({
                                      insert: insertItem,
                                      remove: removeItem,
                                      push: pushItem,
                                    }) => (
                                      <>
                                        {val?.items?.length > 0 &&
                                          val?.items?.map(
                                            (itemVal, itemIndex) => {
                                              return (
                                                <div
                                                  key={itemIndex}
                                                  className="grid  max-w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12"
                                                >
                                                  <div className="sm:col-span-2">
                                                    <div className="mt-2">
                                                      <Field
                                                        id={`section.${index}.items.${itemIndex}.name`}
                                                        name={`section.${index}.items.${itemIndex}.name`}
                                                        type="text"
                                                        autoComplete="sectionTotal"
                                                        value={
                                                          itemVal?.["name"] ??
                                                          ""
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Item Name"
                                                        className="input-field p-2"
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name={`section.${index}.items.${itemIndex}.name`}
                                                      component="div"
                                                      className="field-error text-red-500"
                                                    />
                                                  </div>

                                                  <div className="sm:col-span-2">
                                                    <div className="mt-2">
                                                      <Field
                                                        id={`section.${index}.items.${itemIndex}.description`}
                                                        name={`section.${index}.items.${itemIndex}.description`}
                                                        type="text"
                                                        autoComplete="sectionTotal"
                                                        value={
                                                          itemVal?.[
                                                            "description"
                                                          ] ?? ""
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Item Description"
                                                        className="input-field p-2"
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name={`section.${index}.items.${itemIndex}.description`}
                                                      component="div"
                                                      className="field-error text-red-500"
                                                    />
                                                  </div>
                                                  <div className="sm:col-span-1">
                                                    <div className="mt-2">
                                                      <Field
                                                        id={`section.${index}.items.${itemIndex}.unit`}
                                                        name={`section.${index}.items.${itemIndex}.unit`}
                                                        type="text"
                                                        autoComplete="unit"
                                                        value={
                                                          itemVal?.["unit"] ??
                                                          ""
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Unit"
                                                        className="input-field p-2"
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name={`section.${index}.items.${itemIndex}.unit`}
                                                      component="div"
                                                      className="field-error text-red-500"
                                                    />
                                                  </div>
                                                  <div className="sm:col-span-1">
                                                    <div className="mt-2">
                                                      <Field
                                                        id={`section.${index}.items.${itemIndex}.quantity`}
                                                        name={`section.${index}.items.${itemIndex}.quantity`}
                                                        type="number"
                                                        autoComplete="sectionTotal"
                                                        value={
                                                          itemVal?.[
                                                            "quantity"
                                                          ] ?? ""
                                                        }
                                                        onChange={(e) => {
                                                          handleChange(e);
                                                          const updatedItemsArr =
                                                            updateItems(
                                                              val,
                                                              itemIndex,
                                                              e.target.value,
                                                              "quantity"
                                                            );

                                                          const totalMargin =
                                                            calculateTotalMargin(
                                                              updatedItemsArr?.items
                                                            );
                                                          const itemMargin =
                                                            calculateItemMargin(
                                                              updatedItemsArr?.items,
                                                              itemIndex
                                                            );

                                                          setFieldValue(
                                                            `section.${index}.sectionMargin`,
                                                            totalMargin
                                                          );
                                                          setFieldValue(
                                                            `section.${index}.items.${itemIndex}.marginAmount`,
                                                            itemMargin
                                                          );

                                                          const updateformValues =
                                                            updateformValue(
                                                              values,
                                                              index,
                                                              totalMargin,
                                                              "sectionMargin"
                                                            );

                                                          const finalMargin =
                                                            getFinalTotalMargin(
                                                              updateformValues
                                                            );

                                                          setFieldValue(
                                                            `totalMargin`,
                                                            finalMargin
                                                          );

                                                          const totalAmount =
                                                            getTotalAmount(
                                                              updateformValues
                                                            );

                                                          setFieldValue(
                                                            "totalAmount",
                                                            totalAmount
                                                          );
                                                        }}
                                                        placeholder="Quantity"
                                                        className="input-field p-2"
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name={`section.${index}.items.${itemIndex}.quantity`}
                                                      component="div"
                                                      className="field-error text-red-500"
                                                    />
                                                  </div>
                                                  <div className="sm:col-span-1">
                                                    <div className="mt-2">
                                                      <Field
                                                        id={`section.${index}.items.${itemIndex}.price`}
                                                        name={`section.${index}.items.${itemIndex}.price`}
                                                        type="number"
                                                        autoComplete="Price"
                                                        value={
                                                          itemVal?.["price"] ??
                                                          ""
                                                        }
                                                        onChange={(e) => {
                                                          handleChange(e);
                                                          const updatedItemsArr =
                                                            updateItems(
                                                              val,
                                                              itemIndex,
                                                              e.target.value,
                                                              "price"
                                                            );

                                                          const totalMargin =
                                                            calculateTotalMargin(
                                                              updatedItemsArr?.items
                                                            );
                                                          const itemMargin =
                                                            calculateItemMargin(
                                                              updatedItemsArr?.items,
                                                              itemIndex
                                                            );

                                                          setFieldValue(
                                                            `section.${index}.sectionMargin`,
                                                            totalMargin
                                                          );
                                                          setFieldValue(
                                                            `section.${index}.items.${itemIndex}.marginAmount`,
                                                            itemMargin
                                                          );

                                                          const updateformValues =
                                                            updateformValue(
                                                              values,
                                                              index,
                                                              totalMargin,
                                                              "sectionMargin"
                                                            );
                                                          const finalMargin =
                                                            getFinalTotalMargin(
                                                              updateformValues
                                                            );

                                                          setFieldValue(
                                                            `totalMargin`,
                                                            finalMargin
                                                          );

                                                          const totalAmount =
                                                            getTotalAmount(
                                                              updateformValues
                                                            );

                                                          setFieldValue(
                                                            "totalAmount",
                                                            totalAmount
                                                          );
                                                        }}
                                                        placeholder="Price"
                                                        className="input-field p-2"
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name={`section.${index}.items.${itemIndex}.price`}
                                                      component="div"
                                                      className="field-error text-red-500"
                                                    />
                                                  </div>
                                                  <div className="sm:col-span-2">
                                                    <div className="mt-2 relative">
                                                      <Field
                                                        id={`section.${index}.items.${itemIndex}.margin`}
                                                        name={`section.${index}.items.${itemIndex}.margin`}
                                                        type="number"
                                                        autoComplete="margin"
                                                        value={
                                                          itemVal?.["margin"] ??
                                                          ""
                                                        }
                                                        onChange={(e) => {
                                                          handleChange(e);
                                                          const updatedItemsArr =
                                                            updateItems(
                                                              val,
                                                              itemIndex,
                                                              e.target.value,
                                                              "margin"
                                                            );

                                                          const totalMargin =
                                                            calculateTotalMargin(
                                                              updatedItemsArr?.items
                                                            );

                                                          const itemMargin =
                                                            calculateItemMargin(
                                                              updatedItemsArr?.items,
                                                              itemIndex
                                                            );

                                                          setFieldValue(
                                                            `section.${index}.sectionMargin`,
                                                            totalMargin
                                                          );

                                                          setFieldValue(
                                                            `section.${index}.sectionMargin`,
                                                            totalMargin
                                                          );
                                                          setFieldValue(
                                                            `section.${index}.items.${itemIndex}.marginAmount`,
                                                            itemMargin
                                                          );

                                                          const updateformValues =
                                                            updateformValue(
                                                              values,
                                                              index,
                                                              totalMargin,
                                                              "sectionMargin"
                                                            );

                                                          const finalMargin =
                                                            getFinalTotalMargin(
                                                              updateformValues
                                                            );

                                                          setFieldValue(
                                                            `totalMargin`,
                                                            finalMargin
                                                          );

                                                          const totalAmount =
                                                            getTotalAmount(
                                                              updateformValues
                                                            );

                                                          setFieldValue(
                                                            "totalAmount",
                                                            totalAmount
                                                          );
                                                        }}
                                                        placeholder="Margin"
                                                        className="input-field p-2"
                                                      />
                                                      <span className="absolute font-bold text-lg text-gray-500 right-7 top-[10%]">
                                                        %
                                                      </span>
                                                    </div>
                                                    <ErrorMessage
                                                      name={`section.${index}.items.${itemIndex}.margin`}
                                                      component="div"
                                                      className="field-error text-red-500"
                                                    />
                                                  </div>
                                                  <div className="sm:col-span-2">
                                                    <div className="mt-2">
                                                      <Field
                                                        id={`section.${index}.items.${itemIndex}.total`}
                                                        name={`section.${index}.items.${itemIndex}.total`}
                                                        type="number"
                                                        autoComplete="total"
                                                        value={
                                                          itemVal?.["total"] ??
                                                          ""
                                                        }
                                                        onChange={(e) => {
                                                          handleChange(e);
                                                          const updatedItems =
                                                            updateItems(
                                                              val,
                                                              itemIndex,
                                                              e.target.value,
                                                              "total"
                                                            );

                                                          const total =
                                                            getTotal(
                                                              updatedItems?.items
                                                            );

                                                          setFieldValue(
                                                            `section.${index}.sectionTotal`,
                                                            total
                                                          );

                                                          const updateformValues =
                                                            updateformValue(
                                                              values,
                                                              index,
                                                              total,
                                                              "sectionTotal"
                                                            );

                                                          const subTotal =
                                                            getSubTotal(
                                                              updateformValues
                                                            );
                                                          setFieldValue(
                                                            `subTotal`,
                                                            subTotal
                                                          );

                                                          const totalAmount =
                                                            getTotalAmount(
                                                              updateformValues
                                                            );

                                                          setFieldValue(
                                                            "totalAmount",
                                                            totalAmount
                                                          );
                                                        }}
                                                        placeholder="Total"
                                                        className="input-field p-2"
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name={`section.${index}.items.${itemIndex}.total`}
                                                      component="div"
                                                      className="field-error text-red-500"
                                                    />
                                                  </div>
                                                  <div className="sm:col-span-1 flex justify-center items-center">
                                                    <button
                                                      className=""
                                                      title="Add Item"
                                                      type="button"
                                                      onClick={() => {
                                                        pushItem({
                                                          name: "",
                                                          description: "",
                                                          unit: "",
                                                          quantity: "",
                                                          price: "",
                                                          margin: "",
                                                          marginAmount: "",
                                                          total: "",
                                                        });
                                                      }}
                                                    >
                                                      <img
                                                        src={addIcon}
                                                        className="h-6 w-6"
                                                      />
                                                    </button>
                                                    {itemIndex > 0 ? (
                                                      <button
                                                        className=""
                                                        title="Remove Item"
                                                        onClick={() => {
                                                          removeItem(itemIndex);
                                                        }}
                                                      >
                                                        <img
                                                          src={removeIcon}
                                                          className="h-6 w-6"
                                                        />
                                                      </button>
                                                    ) : (
                                                      <div className="w-6"></div>
                                                    )}
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                      </>
                                    )}
                                  </FieldArray>
                                }
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="flex items-center justify-end gap-x-6  border-gray-900/10 px-4 py-4 sm:px-8">
                  <div>
                    <div className="border-t-2 border-gray-400 flex justify-between gap-x-12 items-center p-3">
                      <span>Sub total</span>
                      <span>{`$ ${values?.subTotal}`}</span>
                    </div>
                    <div className="border-t-2 border-gray-400 flex justify-between gap-x-12 items-center p-3">
                      <span>Total Margin</span>
                      <span>{`$ ${values?.totalMargin ?? "00.00"}`}</span>
                    </div>
                    <div className="border-t-2 border-gray-400 font-semibold flex justify-between gap-x-12 items-center p-3">
                      <span>Total Amount</span>
                      <span>{`$ ${totalAmount}`}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-x-2 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <SpinnerButton
                    className="flex justify-center  py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    title={isEdit ? "Update Now" : "Add Now"}
                    action={() => {}}
                    type={"submit"}
                    loading={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/estimates");
                    }}
                    className="btn-gray"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EstimateForm;
