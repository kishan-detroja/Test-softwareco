import React, { useEffect } from "react";
import ShowPageTitle from "../common/ShowPageTitle";
import { useNavigate, useParams } from "react-router";
import { Field, Form, Formik } from "formik";
import { projectForm, showError } from "../../helper/Validation";
import datePicker from "../../assets/images/datePicker.svg";
import ReactDatePicker from "react-datepicker";
import { statusArray } from "../../helper/data";
import {
  isValidArray,
  isValidObject,
  showErrorMsg,
  showSuccessMsg,
} from "../../helper/utils";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/projects/addProjectSlice";
import SpinnerButton from "../common/SpinnerButton";
import { getProjectDetail } from "../../redux/projects/getProjectDetailSlice";
import { updateProject } from "../../redux/projects/updateProjectSlice";

const ProjectForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const isEdit = !!id;

  const isAddProjectLoading = useSelector(
    (state) => state?.addProject?.loading ?? false
  );
  const isUpdateProjectLoading = useSelector(
    (state) => state?.updateProject?.loading ?? false
  );
  const projectDetail = useSelector(
    (state) => state?.getProjectDetail?.data ?? {}
  );

  const isLoading = isAddProjectLoading || isUpdateProjectLoading;

  const initialValues = {
    customer: isEdit ? projectDetail?.customer ?? "" : "",
    refnumber: isEdit ? projectDetail?.refnumber ?? "" : "",
    projectname: isEdit ? projectDetail?.projectname ?? "" : "",
    projectnumber: isEdit ? projectDetail?.projectnumber ?? "" : "",
    arealocation: isEdit ? projectDetail?.arealocation ?? "" : "",
    address: isEdit ? projectDetail?.address ?? "" : "",
    duedate: isEdit ? projectDetail?.duedate ?? "" : "",
    contact: isEdit ? projectDetail?.contact ?? "" : "",
    manager: isEdit ? projectDetail?.manager ?? "" : "",
    staff: isEdit ? projectDetail?.staff ?? "" : "",
    status: isEdit ? projectDetail?.status ?? "" : "",
    email: isEdit ? projectDetail?.email ?? "" : "",
  };

  const handleSubmit = (values) => {
    const formData = {
      data: values,
      id: id,
    };
    if (isEdit) {
      dispatch(updateProject(formData)).then((data) => {
        if (isValidObject(data?.payload)) {
          showSuccessMsg("Project Updated Successfully.");
          navigate("/projects");
        } else {
          showErrorMsg("Something went wrong!");
        }
      });
    } else {
      dispatch(addProject(values)).then((data) => {
        if (isValidObject(data?.payload)) {
          showSuccessMsg("Project Added Successfully.");
          navigate("/projects");
        } else {
          showErrorMsg("Something went wrong!");
        }
      });
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getProjectDetail(id));
    }
  }, []);

  return (
    <div className="h-[90vh]">
      <ShowPageTitle title={"addProject"} />
      <h2 className="font-bold text-2xl text-txt-color dark:text-white">
        {isEdit ? "Edit Project" : "Add New Project"}
      </h2>
      <div className="mt-8">
        <Formik
          initialValues={initialValues}
          validationSchema={projectForm}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            errors,
            touched,
            validateField,
            validateForm,
            handleChange,
            values,
            handleSubmit,
            handleBlur,
            setFieldValue,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8 gap-y-6">
                <div className="grid max-w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Customer
                    </label>
                    <div className="mt-2">
                      <Field
                        id="customer"
                        name="customer"
                        type="text"
                        autoComplete="customer"
                        value={values?.customer ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Customer"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.customer && showError(errors?.customer)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="refnumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Reference Number
                    </label>
                    <div className="mt-2">
                      <Field
                        id="refnumber"
                        name="refnumber"
                        type="string"
                        autoComplete="refnumber"
                        value={values?.refnumber ?? ""}
                        onChange={handleChange}
                        placeholder="Enter reference number"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.refnumber && showError(errors?.refnumber)}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="projectname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Project Name
                    </label>
                    <div className="mt-2">
                      <Field
                        id="projectname"
                        name="projectname"
                        type="text"
                        autoComplete="projectname"
                        value={values?.projectname ?? ""}
                        onChange={handleChange}
                        placeholder="Enter project name"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.projectname && showError(errors?.projectname)}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="projectnumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Project Number
                    </label>
                    <div className="mt-2">
                      <Field
                        id="projectnumber"
                        name="projectnumber"
                        type="number"
                        autoComplete="projectnumber"
                        value={values?.projectnumber ?? ""}
                        onChange={handleChange}
                        placeholder="Enter project number"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.projectnumber && showError(errors?.projectnumber)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="arealocation"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Area Location
                    </label>
                    <div className="mt-2">
                      <Field
                        id="arealocation"
                        name="arealocation"
                        type="text"
                        autoComplete="arealocation"
                        value={values?.arealocation ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Area Location"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.arealocation && showError(errors?.arealocation)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="address"
                        value={values?.address ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Address"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.address && showError(errors?.address)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Due Date
                    </label>
                    <div className="mt-2 relative">
                      <ReactDatePicker
                        className="input-field"
                        selected={values?.duedate ?? new Date()}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                          setFieldValue("duedate", date);
                        }}
                        placeholderText="Select due date"
                        minDate={new Date()}
                      />
                      <img
                        src={datePicker}
                        className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"
                        alt="Date picker"
                      />
                    </div>
                    {touched?.duedate && showError(errors?.duedate)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact
                    </label>
                    <div className="mt-2">
                      <Field
                        id="contact"
                        name="contact"
                        type="number"
                        autoComplete="contact"
                        value={values?.contact ?? ""}
                        onChange={handleChange}
                        placeholder="Enter contact"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.contact && showError(errors?.contact)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="manager"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Manager
                    </label>
                    <div className="mt-2">
                      <Field
                        id="manager"
                        name="manager"
                        type="text"
                        autoComplete="manager"
                        value={values?.manager ?? ""}
                        onChange={handleChange}
                        placeholder="Enter manager"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.manager && showError(errors?.manager)}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="staff"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Staff
                    </label>
                    <div className="mt-2">
                      <Field
                        id="staff"
                        name="staff"
                        type="text"
                        autoComplete="staff"
                        value={values?.staff ?? ""}
                        onChange={handleChange}
                        placeholder="Enter staff"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.staff && showError(errors?.staff)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Status
                    </label>
                    <div className="mt-2">
                      <Field
                        as="select"
                        className="input-field"
                        name="status"
                        onChange={(e) => {
                          setFieldValue("status", e.target.value);
                        }}
                      >
                        <option key={1} value={""}>
                          Select status
                        </option>
                        {isValidArray(statusArray) &&
                          statusArray?.map((item) => (
                            <option
                              key={item?.value}
                              value={item?.value ?? ""}
                              defaultValue={values?.status ?? ""}
                            >
                              {item?.label}
                            </option>
                          ))}
                      </Field>
                    </div>
                    {touched?.status && showError(errors?.status)}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values?.email ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="input-field p-2"
                      />
                    </div>
                    {touched?.email && showError(errors?.email)}
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
                    navigate("/projects");
                  }}
                  className="btn-gray"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProjectForm;
