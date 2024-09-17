import {
  CurrencyDollarIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import { useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { language } = useContext(ThemeContext);
  const { t } = useTranslation("translation", {
    lng: language,
  });

  const [selectedMenuItem, setMenuItem] = useState("Dashboard");

  const location = useLocation();

  const currentUrl = location?.pathname;

  const navigation = [
    { name: t("dashboard") , href: "/dashboard", value:"dashboard", icon: HomeIcon, current: true },
    {
      name: t("project"),
      href: "/projects",
      value:"projects",
      icon: Squares2X2Icon,
      current: true,
    },
    {
      name: t("estimation"),
      href: "/estimates",
      value:"estimates",
      icon: CurrencyDollarIcon,
      current: true,
    },
  ];

  useEffect(() => {
    if (currentUrl.startsWith("/estimates")) {
      setMenuItem("estimates");
    } else if (currentUrl.includes("/dashboard")) {
      setMenuItem("dashboard");
    } else if (currentUrl.includes("/projects")) {
      setMenuItem("projects");
    }
  }, [navigate]);

  return (
    <div>
      <SidebarMenu
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
        setMenuItem={setMenuItem}
        selectedMenuItem={selectedMenuItem}
        teams={[]}
        isBackToLoginShow={false}
        handleBackToAdmin={() => {}}
        isLogoutButtonShow={true}
      />
    </div>
  );
};

export default Sidebar;
