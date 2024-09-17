import { toast } from "react-toastify";
import { statusArray } from "./data";

export const getAuthToken = () => {
  return localStorage.getItem("AUTH_TOKEN") ?? "";
};

export const setAuthToken = (data) => {
  return localStorage.setItem("AUTH_TOKEN", data);
};

export const removeAuthToken = () => {
  return localStorage.removeItem("AUTH_TOKEN");
};

export const doEmptyLocalStorage = () => {
  removeAuthToken();
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key) ?? "";
};

export const setLocalStorage = (key, data) => {
  return localStorage.setItem(key, data);
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const showSuccessMsg = (msg = "") => {
  toast.success(msg);
};
export const showErrorMsg = (msg = "Something went wrong.") => {
  toast.error(msg);
};

export const isValidArray = (data) => {
  return data && Array.isArray(data) && data.length > 0;
};

export const isValidObject = (data) => {
  return (
    typeof data === "object" && data !== null && Object.keys(data).length !== 0
  );
};

export const formatDate = (datetimeStr) => {
  const date = new Date(datetimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getStatusTitle = (status) => {
  const data = statusArray.find((item) => item.value === status);
  return data?.label ?? "";
};

export const getFilteredProjects = (data = [], status = "") => {
  const result = data?.filter((item) =>
    status ? item.status === status : true
  );
  return result.length ?? "0";
};
