import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi, putApi } from "../api";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (formData, { rejectWithValue }) => {
    try {
      const { data, id } = formData;
      const response = await putApi(`api/projects/${id}`, data);
      return response?.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const updateProjectSlice = createSlice({
  name: "updateProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default updateProjectSlice.reducer;
