import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/projects/getAllProjectsSlice";
import {
  formatDate,
  isValidArray,
  isValidObject,
  showErrorMsg,
  showSuccessMsg,
} from "../../helper/utils";
import { getAllEstimates } from "../../redux/estimates/getAllEstimatesSlice";
import { Link } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import CommonTable from "../common/Field/CommonTable";
import { deleteEstimate } from "../../redux/estimates/deleteEstimateSlice";
import ConfirmationModal from "../common/ConfirmationModal";

const EstimateList = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [selectedId, setId] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const isGetAllEstimateLoading = useSelector(
    (state) => state?.getAllEstimates?.loading ?? false
  );
  const isDeleteEstimateLoading = useSelector(
    (state) => state?.deleteEstimate?.loading ?? false
  );

  const columnDefs = [
    {
      headerName: "VERSION",
      field: "version",
    },
    {
      headerName: "PROJECT",
      field: "project",
      width: 300,
    },
    {
      headerName: "CLIENT",
      field: "client",
      width: 300,
    },
    {
      headerName: "CREATED DATE",
      field: "createdAt",
      cellRenderer: ({ value }) => <>{formatDate(value ?? "") ?? ""}</>,
    },

    {
      headerName: "LAST MODIFIED",
      field: "lastmodified",
      cellRenderer: ({ value }) => <>{formatDate(value ?? "") ?? ""}</>,
    },
    {
      headerName: "STATUS",
      field: "status",
    },
    {
      headerName: "ACTIONS",
      field: "id",
      cellRenderer: ({ value }) => (
        <div className="flex justify-start items-center gap-x-2 p-2">
          <Link to={`/estimates/edit/${value}`}>
            <PencilSquareIcon className="w-6 h-6 cursor-pointer" />
          </Link>

          <TrashIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setId(value);
              setModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleEstimateList = () => {
    dispatch(getAllEstimates()).then((data) => {
      if (isValidArray(data?.payload)) {
        setRowData(data?.payload);
      }
    });
  };

  const handleDeleteEstimate = () => {
    dispatch(deleteEstimate(selectedId)).then((data) => {
      if (isValidObject(data?.payload)) {
        showSuccessMsg("Estimate deleted successfully");
        setModalOpen(false);
        handleEstimateList();
      } else {
        showErrorMsg();
      }
    });
  };

  useEffect(() => {
    handleEstimateList();
  }, []);

  return (
    <div
      className="ag-theme-alpine" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <CommonTable
        isLoading={isGetAllEstimateLoading}
        rowData={rowData}
        columnDefs={columnDefs}
      />
      {isModalOpen && (
        <ConfirmationModal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          handleAction={handleDeleteEstimate}
          isLoading={isDeleteEstimateLoading}
          message={"You want to delete this record ?"}
        />
      )}
    </div>
  );
};

export default EstimateList;
