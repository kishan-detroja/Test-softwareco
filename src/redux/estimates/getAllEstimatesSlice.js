import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../api";
import { setAuthToken } from "../../helper/utils";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const getAllEstimates = createAsyncThunk(
  "estimates/getAllEstimates",
  async (data = {}, { rejectWithValue }) => {
    try {
      const response = await getApi("api/estimates");

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

const getAllEstimatesSlice = createSlice({
  name: "getAllEstimates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEstimates.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllEstimates.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(getAllEstimates.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default getAllEstimatesSlice.reducer;
