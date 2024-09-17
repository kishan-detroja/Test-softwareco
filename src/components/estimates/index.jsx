import React from "react";
import ShowPageTitle from "../common/ShowPageTitle";
import { useNavigate } from "react-router";
import EstimateList from "./EstimateList";

export const EstimatesMain = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <ShowPageTitle title={"estimates"} />
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-txt-color dark:text-white p-2">
          Estimates
        </h2>
        <button
          className="btn-blue"
          onClick={() => {
            navigate("/estimates/add");
          }}
        >
          Add Estimate
        </button>
      </div>
      <div className="table w-full h-[100%] mt-10">
        <EstimateList />
      </div>
    </div>
  );
};
