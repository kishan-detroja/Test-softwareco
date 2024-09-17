import React, { useContext, useEffect, useState } from "react";
import Statistics from "./Statistics";
import Table from "./Table";
import Chart from "./Chart";
import ShowPageTitle from "../common/ShowPageTitle";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../redux/projects/getAllProjectsSlice";
import { isValidArray } from "../../helper/utils";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [totalProjects, setTotalProjects] = useState([]);
  const { language } = useContext(ThemeContext);
  const { t } = useTranslation("translation", {
    lng: language,
  });
  const handleProjectList = () => {
    dispatch(getAllProjects()).then((data) => {
      if (isValidArray(data?.payload)) {
        setTotalProjects(data?.payload);
      }
    });
  };

  useEffect(() => {
    handleProjectList();
  }, []);
  return (
    <div>
      <ShowPageTitle title="dashboard" />
      <p className="font-bold text-txt-color dark:text-white text-2xl">
        {t("dashboard")}
      </p>
      <div className="mt-4">
        <Statistics
          totalProjects={totalProjects}
          setTotalProjects={setTotalProjects}
        />
      </div>
      <div className="mt-4 rounded-md shadow-md bg-white px-4 py-4">
        <h2 className="text-xl font-semibold mb-4">{t("projectStatistics")}</h2>
        <Chart totalProjects={totalProjects} />
      </div>
      <div className="mt-4 rounded-md shadow-md bg-white px-0 py-4">
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
