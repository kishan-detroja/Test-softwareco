import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteApi, getApi } from "../api";
import { setAuthToken } from "../../helper/utils";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const deleteEstimate = createAsyncThunk(
  "auth/deleteEstimate",
  async (id = {}, { rejectWithValue }) => {
    try {
      const response = await deleteApi(`api/estimates/${id}`);

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

const deleteEstimateSlice = createSlice({
  name: "deleteEstimate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteEstimate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteEstimate.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(deleteEstimate.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default deleteEstimateSlice.reducer;
