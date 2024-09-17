import React from "react";
import { Route, Routes } from "react-router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PublicLayout from "./components/layoutes/PublicLayout";
import AuthLayout from "./components/layoutes/AuthLayout";
import Dashboard from "./components/dashboard";
import NoMatch from "./components/common/NoMatch";
import ProjectsMain from "./components/projects";
import { EstimatesMain } from "./components/estimates";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProjectForm from "./components/projects/ProjectForm";
import EstimateForm from "./components/estimates/EstimateForm";

const RouteFile = () => {
  return (
    <Routes>
      {/* No AUTH LAYOUT */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* AUTH LAYOUT */}
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsMain />} />
        <Route path="/projects/add" element={<ProjectForm />} />
        <Route path="/projects/edit/:id" element={<ProjectForm />} />
        <Route path="/estimates" element={<EstimatesMain />} />
        <Route path="/estimates/add" element={<EstimateForm />} />
        <Route path="/estimates/edit/:id" element={<EstimateForm />} />

        {/* <Route path="/logout" element={<Logout />} /> */}
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default RouteFile;
