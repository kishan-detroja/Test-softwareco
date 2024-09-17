import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuthToken } from "../../helper/utils";

const NoMatch = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!getAuthToken();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);
  return "";
};

export default NoMatch;
