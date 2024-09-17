import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useState } from "react";
import { statusArray } from "../../../helper/data";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Status = (props) => {
  const {
    rowData = [],
    setRowData = () => {},
    selectedStatus = "",
    setStatus = () => {},
    handleFilter = () => {},
  } = props;

  return (
    <div>
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="hidden sm:flex sm:items-center">
            <span
              aria-hidden="true"
              className="ml-2 text-sm font-semibold leading-6  text-gray-900"
            >
              {selectedStatus ? selectedStatus : "Status"}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="ml-2 h-5 w-4 text-black"
            />
          </span>
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {statusArray.map((item) => (
            <MenuItem key={item.label}>
              <span
                onClick={() => {
                  setStatus(item.label);
                  handleFilter(item.value);
                }}
                className="group cursor-pointer font-semibold flex gap-x-2 items-center px-4 py-2 text-sm text-txt-color data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {item.label}
              </span>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Status;
