import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    changeLanguage(savedLang ?? "en");
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lang = "en") => {
    localStorage.setItem("lang", lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleTheme, changeLanguage, language, setLanguage }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
