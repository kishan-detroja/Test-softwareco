import classNames from "classnames";
import React, { useState } from "react";
import { columnNotToShow } from "../../../helper/data";

const HideColumnDropdown = (props) => {
  const {
    handleHideShowColumn = () => {},
    hiddenColumns = [],
    setHiddenColumns = () => {},
    initColumnDefs = [],
  } = props;
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = () => {
    handleHideShowColumn(hiddenColumns);
  };
  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
        aria-expanded="false"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <span>Hide Columns</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-[550px] flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-8 max-w-lg gap-x-3 flex justify-center gap-y-3 flex-wrap items-center">
              {initColumnDefs.map((item, index) => {
                return (
                  <div key={index}>
                    {!columnNotToShow.includes(item?.field) ? (
                      <button
                        onClick={() => {
                          const data = !hiddenColumns.includes(item?.field)
                            ? [...hiddenColumns, item?.field]
                            : hiddenColumns.filter(
                                (val) => val !== item?.field
                              );

                          setHiddenColumns(data);
                        }}
                        className={classNames(
                          "btn-blue !rounded-2xl  min-w-[100px]",
                          {
                            "!bg-blue-500 !text-white": hiddenColumns.includes(
                              item?.field
                            ),
                            "!bg-gray-200 !text-gray-700 hover:!bg-gray-300":
                              !hiddenColumns.includes(item?.field),
                          }
                        )}
                      >
                        {item?.headerName}
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-x-2 items-center p-2 border-t">
              <button
                className="btn-gray"
                onClick={() => {
                  setHiddenColumns([]);
                }}
              >
                Reset
              </button>
              <button
                className="btn-blue"
                onClick={() => {
                  handleSubmit();
                  setOpen(false);
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HideColumnDropdown;
