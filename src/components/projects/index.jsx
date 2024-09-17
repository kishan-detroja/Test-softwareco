import React from "react";
import ShowPageTitle from "../common/ShowPageTitle";
import Filters from "./Filters";
import { useNavigate } from "react-router";
import ProjectList from "./ProjectList";

const ProjectsMain = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[90vh]">
      <ShowPageTitle title={"projects"} />
      <h2 className="font-bold text-2xl text-txt-color dark:text-white p-2">
        Projects
      </h2>
      <ProjectList />
      {/* <div className="flex gap-x-3 justify-between items-center">
        <Filters />
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
        <ProjectList />
      </div> */}
    </div>
  );
};

export default ProjectsMain;
