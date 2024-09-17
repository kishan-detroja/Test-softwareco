import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import ShowPageTitle from "../common/ShowPageTitle";
import {
  doEmptyLocalStorage,
  getAuthToken,
  getLocalStorage,
  isValidObject,
} from "../../helper/utils";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/users/getUserDetailsSlice";

const AuthLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = !!getAuthToken();

  useEffect(() => {
    if (!isLoggedIn) {
      doEmptyLocalStorage();
      navigate("/login");
    } else {
      const userData = getLocalStorage("USER_DATA")
        ? JSON.parse(getLocalStorage("USER_DATA"))
        : {};

      if (isValidObject(userData)) {
        dispatch(getUserDetails(userData?.id ?? 0)).then((data) => {});
      }
    }
  }, []);

  return (
    <div className="sidebar">
      <ShowPageTitle />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="lg:pl-72">
        <Header setSidebarOpen={setSidebarOpen} />

        <div className="px-4 py-4 sm:px-4 lg:px-4 lg:py-4 bg-dashboard-bg dark:bg-dashboard-dark-bg">
          {" "}
          {children} <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
