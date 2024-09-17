import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../api";
import { setAuthToken } from "../../helper/utils";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const getAllProjects = createAsyncThunk(
  "auth/getAllProjects",
  async (data = {}, { rejectWithValue }) => {
    try {
      const response = await getApi("api/projects");
      return response?.data;
    } catch (error) {
      if (error.response && error.response?.data) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const getAllProjectsSlice = createSlice({
  name: "getAllProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default getAllProjectsSlice.reducer;
