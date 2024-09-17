import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { PowerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/images/Logo.svg";
import LogoLight from "../../assets/images/light-logo.svg";

import classNames from "classnames";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { doEmptyLocalStorage, showSuccessMsg } from "../../helper/utils";
import { useTranslation } from "react-i18next";

const SidebarMenu = (props) => {
  const {
    sidebarOpen,
    setSidebarOpen,
    navigation,
    setMenuItem,
    selectedMenuItem,
  } = props;

  const { darkMode, toggleTheme, language } = useContext(ThemeContext);
  const { t, i18n } = useTranslation("translation", { lng: language });
  const navigate = useNavigate();

  const handleLogout = () => {
    doEmptyLocalStorage();
    showSuccessMsg("Logout Successfully.");
    navigate("/login");
  };

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-main-dark-bg px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center justify-center">
                <img
                  alt="Your Company"
                  src={darkMode ? LogoLight : Logo}
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={(e) => {
                            if (!e.ctrlKey) {
                              setMenuItem(item.name);
                            }
                          }}
                        >
                          <Link
                            to={item.href}
                            className={classNames(
                              item.value === selectedMenuItem
                                ? "menu-item-background text-white"
                                : "text-gray-700 dark:text-white hover:bg-menu-item-bg hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.value === selectedMenuItem
                                  ? "text-white"
                                  : "text-gray-700 dark:text-white group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="mt-auto">
                    <span
                      onClick={handleLogout}
                      className="group cursor-pointer -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-white hover:bg-menu-item-bg hover:text-white"
                    >
                      <PowerIcon
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0 text-gray-700 dark:text-white group-hover:text-white"
                      />
                      {t("logout")}
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col dark:bg-main-dark-bg">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-[#273142] dark:bg-main-dark-bg bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 justify-center items-center">
            <img
              alt="Your Company"
              src={darkMode ? LogoLight : Logo}
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li
                      key={item.name}
                      onClick={(e) => {
                        if (!e.ctrlKey) {
                          setMenuItem(item.name);
                        }
                      }}
                    >
                      <Link
                        to={item.href}
                        className={classNames(
                          item.value === selectedMenuItem
                            ? "menu-item-background text-white"
                            : "text-gray-700 dark:text-white hover:bg-menu-item-bg hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.value === selectedMenuItem
                              ? "text-white"
                              : "text-gray-700 dark:text-white group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <span
                  onClick={handleLogout}
                  className="group cursor-pointer -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-white hover:bg-menu-item-bg hover:text-white"
                >
                  <PowerIcon
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-gray-700 dark:text-white group-hover:text-white"
                  />
                  {t("logout")}
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
