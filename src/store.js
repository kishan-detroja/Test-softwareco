import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./redux/auth/loginSlice";
import getAllUsersSlice from "./redux/users/getAllUsersSlice";
import registerUserSlice from "./redux/users/registerUserSlice";
import getUserDetailsSlice from "./redux/users/getUserDetailsSlice";
import getAllProjectsSlice from "./redux/projects/getAllProjectsSlice";
import getAllEstimatesSlice from "./redux/estimates/getAllEstimatesSlice";
import addProjectSlice from "./redux/projects/addProjectSlice";
import deleteProjectSlice from "./redux/projects/deleteProjectSlice";
import getProjectDetailSlice from "./redux/projects/getProjectDetailSlice";
import updateProjectSlice from "./redux/projects/updateProjectSlice";
import addEstimatesSlice from "./redux/estimates/addEstimatesSlice";
import getEstimateDetailSlice from "./redux/estimates/getEstimateDetailSlice";
import updateEstimateSlice from "./redux/estimates/updateEstimateSlice";
import deleteEstimateSlice from "./redux/estimates/deleteEstimateSlice";

const rootReducer = combineReducers({
  login: loginSlice,
  getAllUsers: getAllUsersSlice,
  registerUser: registerUserSlice,
  getUserDetails: getUserDetailsSlice,
  getAllProjects: getAllProjectsSlice,
  getAllEstimates: getAllEstimatesSlice,
  addProject: addProjectSlice,
  deleteProject: deleteProjectSlice,
  getProjectDetail: getProjectDetailSlice,
  updateProject: updateProjectSlice,
  addEstimates: addEstimatesSlice,
  getEstimateDetail: getEstimateDetailSlice,
  updateEstimate: updateEstimateSlice,
  deleteEstimate: deleteEstimateSlice,
});

export default configureStore({
  reducer: rootReducer,
});
