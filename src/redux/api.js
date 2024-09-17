import axios from "axios";
import { doEmptyLocalStorage, getAuthToken } from "../helper/utils";

export const API_URL = import.meta.env.VITE_API_URL;


export const AUTH_TOKEN = "";

const apiConfig = (isImage = false) => {
  const authToken = getAuthToken();

  return {
    headers: {
      "Content-Type": isImage ? "multipart/form-data" : "application/json",
      Accept: "application/json",
      Authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
};

export const getApi = (url, options = {}) => {
  return axios.get(`${API_URL}${url}`, apiConfig());
};

export const postApi = (url, ApiData = {}, isImage = false) => {
  return axios.post(`${API_URL}${url}`, ApiData, apiConfig(isImage));
};
export const putApi = (url, ApiData = {}, isImage = false) => {
  return axios.put(`${API_URL}${url}`, ApiData, apiConfig(isImage));
};
export const patchApi = (url, ApiData = {}, isImage = false) => {
  return axios.patch(`${API_URL}${url}`, ApiData, apiConfig(isImage));
};
export const deleteApi = (url, options = {}) => {
  return axios.delete(`${API_URL}${url}`, apiConfig());
};

export const apiGetData = (data) => {
  return data?.data ?? data ?? null;
};

export const setInterceptor = (data) => {
  return axios.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        alert("You are not authorized");
      }
      return response;
    },
    (error) => {
      if (
        error?.code === "ERR_NETWORK" ||
        error?.response?.status === 401 ||
        error?.response?.status === 403
      ) {
        doEmptyLocalStorage();
        window.location.reload();
      }

      if (error?.response && error?.response?.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error?.message);
    }
  );
};
