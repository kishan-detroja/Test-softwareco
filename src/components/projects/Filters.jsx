import { ArrowUturnLeftIcon, FunnelIcon } from "@heroicons/react/24/outline";
import HideColumnDropdown from "./filter/HideColumnDropdown";
import Status from "./filter/Status";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Filters(props) {
  const {
    rowData = [],
    setRowData = () => {},
    setColumnDefs = () => {},
    columnDefs = [],
    initColumnDefs = [],
  } = props;

  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [selectedStatus, setStatus] = useState("");

  const projectData = useSelector(
    (state) => state?.getAllProjects?.data ?? false
  );

  const handleFilter = (status) => {
    const result = projectData?.filter((item) =>
      status ? item.status === status : true
    );
    setRowData(result);
  };
  const handleHideShowColumn = (columns = hiddenColumns) => {
    const data = columnDefs?.map((item) => {
      return columns.includes(item.field)
        ? {
            ...item,
            hide: true,
          }
        : {
            ...item,
            hide: false,
          };
    });
    setColumnDefs(data);
  };

  return (
    <dl className="w-[80%] min-h-[50px]  flex  justify-between ">
      <div className="flex w-[20%] flex-wrap  border border-gray-300  items-center justify-center rounded-l-xl gap-x-4 gap-y-2 bg-white px-4  sm:px-4 xl:px-4">
        <button onClick={() => {}}>
          <FunnelIcon className="w-8 h-8" />
        </button>
      </div>
      <div className="flex min-w-[15%] flex-wrap  border border-gray-300  items-center justify-center gap-x-4 gap-y-2 bg-white px-4  sm:px-4 xl:px-4">
        <span
          aria-hidden="true"
          className="ml-2 text-sm font-semibold leading-6  text-gray-900"
        >
          Filter By
        </span>
      </div>
      <div className="flex flex-wrap w-full border border-gray-300  items-center justify-center gap-x-4 gap-y-2 bg-white px-4  sm:px-4 xl:px-4">
        <HideColumnDropdown
          handleHideShowColumn={handleHideShowColumn}
          hiddenColumns={hiddenColumns}
          setHiddenColumns={setHiddenColumns}
          initColumnDefs={initColumnDefs}
        />
      </div>
      <div className="flex flex-wrap w-full border border-gray-300  items-center justify-center gap-x-4 gap-y-2 bg-white px-4  sm:px-4 xl:px-4">
        <Status
          rowData={rowData}
          setRowData={setRowData}
          selectedStatus={selectedStatus}
          setStatus={setStatus}
          handleFilter={handleFilter}
        />
      </div>

      <div className="flex flex-wrap w-full border border-gray-300  items-center justify-center gap-x-4 rounded-r-xl gap-y-2 bg-white px-4  sm:px-4 xl:px-4">
        <button
          onClick={() => {
            setStatus("");
            handleFilter("");
            setHiddenColumns([]);
            handleHideShowColumn([]);
          }}
          className="flex justify-center items-center gap-x-2"
        >
          <ArrowUturnLeftIcon className="w-6 h-6 text-red-500 font-semibold" />
          <span className="text-red-600 font-semibold ">Reset Filter</span>
        </button>
      </div>
    </dl>
  );
}
