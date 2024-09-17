import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuthToken } from "../../helper/utils";

const PublicLayout = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!getAuthToken();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="overflow-auto bg-gray-100 h-full w-full">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
