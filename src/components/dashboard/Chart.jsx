import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getFilteredProjects } from "../../helper/utils";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Chart = (props) => {
  const { totalProjects = [] } = props;
  const { language } = useContext(ThemeContext);
  const { t } = useTranslation("translation", {
    lng: language,
  });
  const chartColums = ["", "in-progress", "pending", "completed", "rejected"];
  const [chartData, setChartData] = useState(chartColums);

  const data = {
    options: {
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [
          t("total"),
          t("inProgress"),
          t("pending"),
          t("completed"),
          t("rejected"),
        ],
      },
    },
    series: [
      {
        data: chartData,
      },
    ],
  };

  useEffect(() => {
    const chartData = chartColums.map((item) => {
      const data = getFilteredProjects(totalProjects ?? [], item) ?? [];

      return data ?? 0;
    });
    setChartData(chartData);
  }, [totalProjects]);

  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="bar"
      width={"100%"}
      height={320}
    />
  );
};

export default Chart;
