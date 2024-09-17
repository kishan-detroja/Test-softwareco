import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import flagDenmark from "../../assets/images/flag-denmark.svg";
import flagUK from "../../assets/images/flag-uk.svg";
import profileIcon from "../../assets/images/profile-icon.svg";

import moonIcon from "../../assets/images/moon-icon.svg";
import notificationIcon from "../../assets/images/notification-icon.svg";
import sunIcon from "../../assets/images/sun-icon.svg";

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import { languageArr } from "../../helper/data";
import { getLocalStorage } from "../../helper/utils";

const Header = (props) => {
  const { setSidebarOpen } = props;
  const { darkMode, toggleTheme, changeLanguage, language } =
    useContext(ThemeContext);
  const { t, i18n } = useTranslation("translation", { lng: language });
  const userData = getLocalStorage("USER_DATA")
    ? JSON.parse(getLocalStorage("USER_DATA"))
    : {};

  const userNavigation = [
    {
      name: "Danish",
      value: "de",
      icon: () => <img src={flagDenmark} alt="uk" className="w-8 h-8" />,
    },
    {
      name: "English",
      value: "en",
      icon: () => <img src={flagUK} alt="uk" className="w-8 h-8" />,
    },
  ];
  const getFlagByLang = () => {
    const flag = userNavigation.find((item) => item.value === language);

    return flag.icon();
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-[#273142] dark:bg-main-dark-bg bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6 dark:text-white" />
      </button>

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 sm:justify-end gap-x-4 self-stretch lg:gap-x-6 ">
        <form
          action="#"
          method="GET"
          className="hidden   sm:relative sm:flex sm:items-center sm:flex-1"
        >
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-400"
          />
          <input
            id="search-field"
            name="search"
            type="search"
            placeholder={t("search")}
            className="block rounded-3xl top-[50%] h-[70%] sm:[50%]  lg:w-[40%] border-1.5  py-0 pl-10 pr-0 text-gray-900 dark:bg-[#323D4E] dark:text-white bg-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <img
              src={notificationIcon}
              className="h-8 w-8"
              alt="Notification"
            />
          </button>

          {/* Language dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              {getFlagByLang()}
              <span className="hidden sm:flex sm:items-center">
                <span
                  aria-hidden="true"
                  className="ml-2 text-sm font-semibold leading-6 dark:text-white text-gray-900"
                >
                  {languageArr[language]}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 text-gray-400"
                />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  <span
                    onClick={() => {
                      changeLanguage(item.value);
                    }}
                    className="group cursor-pointer font-semibold flex gap-x-2 items-center px-4 py-2 text-sm text-txt-color data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="mr-3 h-5 w-5 text-txt-color group-hover:text-gray-900"
                    />
                    {item.name}
                  </span>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          <div className="flex justify-center gap-x-3 items-center">
            <img
              alt=""
              src={profileIcon}
              className="h-8 w-8 rounded-full bg-gray-50"
            />
            <div className="flex-none dark:text-white text-gray-900">
              <p className="font-semibold">{userData?.username ?? "Harley"}</p>
              <p className="text-sm">Admin</p>
            </div>
          </div>

          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>

            <img
              src={darkMode ? sunIcon : moonIcon}
              alt="theme"
              className=""
              onClick={toggleTheme}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
