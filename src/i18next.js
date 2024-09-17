import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../src/assets/locale/en.json";
import de from "../src/assets/locale/de.json";


const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

i18n.use(initReactI18next).init({
  resources,
  keySeparator: false,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
