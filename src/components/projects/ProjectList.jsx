import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import manIcon1 from "../../assets/images/man-1.webp";
import manIcon2 from "../../assets/images/man-2.webp";
import manIcon3 from "../../assets/images/man-3.jpeg";
import manIcon4 from "../../assets/images/man-4.jpeg";
import { Link, useNavigate } from "react-router-dom";
import {
  formatDate,
  getStatusTitle,
  isValidArray,
  isValidObject,
  showErrorMsg,
  showSuccessMsg,
} from "../../helper/utils";
import { deleteProject } from "../../redux/projects/deleteProjectSlice";
import { getAllProjects } from "../../redux/projects/getAllProjectsSlice";
import ConfirmationModal from "../common/ConfirmationModal";
import CommonTable from "../common/Field/CommonTable";
import Filters from "./Filters";

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [rowData, setRowData] = useState([]);
  const [selectedId, setId] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const isGetAllProjectLoading = useSelector(
    (state) => state?.getAllProjects?.loading ?? false
  );

  const initColumnDefs = [
    {
      headerName: "CUSTOMERS",
      field: "customer",
    },
    {
      headerName: "REF NUMBER",
      field: "refnumber",
    },

    {
      headerName: "PROJECT REFERENCE",
      field:"projectreference",
      children: [
        { headerName: "PROJECT NAME", field: "projectname" },
        { headerName: "PROJECT NUMBER", field: "projectnumber" },
      ],
    },
    {
      headerName: "PROJECT LOCATION",
      field:"projectlocation",
      children: [
        { headerName: "AREA LOCATION", field: "arealocation" },
        { headerName: "ADDRESS", field: "address" },
      ],
    },
    {
      headerName: "DUE DATE",
      field: "dueDate",
      cellRenderer: ({ value }) => <>{formatDate(value ?? "") ?? ""}</>,
    },
    {
      headerName: "CONTACT",
      field: "contact",
    },
    {
      headerName: "ASSIGN TO",
      field:"assignto",
      children: [
        { headerName: "MANAGER", field: "manager" },
        { headerName: "STAFF", field: "staff" },
      ],
    },
    {
      headerName: "STATUS",
      field: "status",
      cellRenderer: ({ value }) => (
        <span
          className={`${value} inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-green-600/20`}
        >
          {getStatusTitle(value)}
        </span>
      ),
    },
    {
      headerName: "ACTIONS",
      field: "id",
      cellRenderer: ({ value }) => (
        <div className="flex justify-start items-center gap-x-2 p-2">
          <Link to={`/projects/edit/${value}`}>
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
    {
      headerName: "COMMENTS",
      field: "comments",
      cellRenderer: ({}) => (
        <div className="flex w-full justify-center gap-x-2 p-2">
          <img
            src={manIcon1}
            alt="man-1"
            className="h-6 w-6 rounded-full object-cover"
          />
          <img
            src={manIcon2}
            alt="man-2"
            className="h-6 w-6 rounded-full object-cover"
          />
          <img
            src={manIcon3}
            alt="man-3"
            className="h-6 w-6 rounded-full object-cover"
          />
          <img
            src={manIcon4}
            alt="man-4"
            className="h-6 w-6 rounded-full object-cover"
          />
        </div>
      ),
    },
  ];

  const [columnDefs, setColumnDefs] = useState(initColumnDefs);

  const handleProjectList = () => {
    dispatch(getAllProjects()).then((data) => {
      if (isValidArray(data?.payload)) {
        setRowData(data?.payload);
      }
    });
  };
  const handleDeleteProject = () => {
    dispatch(deleteProject(selectedId)).then((data) => {
      if (isValidObject(data?.payload)) {
        showSuccessMsg("Project deleted successfully");
        setModalOpen(false);
        handleProjectList();
      } else {
        showErrorMsg();
      }
    });
  };

  useEffect(() => {
    handleProjectList();
  }, []);

  return (
    <>
      <div className="flex gap-x-3 justify-between items-center mt-5">
        <Filters
          rowData={rowData}
          setRowData={setRowData}
          columnDefs={columnDefs}
          setColumnDefs={setColumnDefs}
          initColumnDefs={initColumnDefs}
        />
        <button
          className="btn-blue"
          onClick={() => {
            navigate("/projects/add");
          }}
        >
          Add Project
        </button>
      </div>
      <div className="table w-full h-[100%] mt-10">
        <div
          className="ag-theme-alpine" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <CommonTable
            isLoading={isGetAllProjectLoading}
            rowData={rowData}
            columnDefs={columnDefs}
          />
          {isModalOpen && (
            <ConfirmationModal
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              handleAction={handleDeleteProject}
              isLoading={false}
              message={"You want to delete this record ?"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
