import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  RocketLaunchIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import CountUp from "react-countup";
import { getFilteredProjects } from "../../helper/utils";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Statistics(props) {
  const { totalProjects = [], setTotalProjects = () => {} } = props;
  const { language } = useContext(ThemeContext);
  const { t } = useTranslation("translation", {
    lng: language,
  });

  const stats = [
    {
      id: 1,
      name: t("totalProjects"),
      stat: totalProjects?.length ?? "0",
      icon: Squares2X2Icon,
      change: "2",
      changeType: "increase",
    },
    {
      id: 2,
      name: t("onGointProjects"),
      stat: getFilteredProjects(totalProjects ?? [], "in-progress") ?? "0",
      icon: RocketLaunchIcon,
      change: "5.4%",
      changeType: "increase",
    },
    {
      id: 3,
      name: t("completedProjects"),
      stat: getFilteredProjects(totalProjects ?? [], "completed") ?? "0",
      icon: CheckBadgeIcon,
      change: "3.2%",
      changeType: "decrease",
    },
    {
      id: 4,
      name: t("rejectedProjects"),
      stat: getFilteredProjects(totalProjects ?? [], "rejected") ?? 0,
      icon: ExclamationTriangleIcon,
      change: "1.2%",
      changeType: "decrease",
    },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-menu-item-bg p-3">
                <item.icon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                <CountUp end={item.stat} duration={2} />
              </p>
              <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                  />
                ) : (
                  <ArrowDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    to="/projects"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {t("viewAll")}
                    <span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
