import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pageTitles } from "../../helper/data";

const ShowPageTitle = ({ title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const showTitle = pageTitles?.[title] ?? "";
    document.title = showTitle ? `Test | ${showTitle}` : "Test Demo";
  }, [navigate]);

  return <div></div>;
};

export default ShowPageTitle;
