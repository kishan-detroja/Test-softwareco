import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteApi, getApi } from "../api";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const deleteProject = createAsyncThunk(
  "estimate/deleteProject",
  async (id = {}, { rejectWithValue }) => {
    try {
      const response = await deleteApi(`api/projects/${id}`);

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

const deleteProjectSlice = createSlice({
  name: "deleteProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default deleteProjectSlice.reducer;
