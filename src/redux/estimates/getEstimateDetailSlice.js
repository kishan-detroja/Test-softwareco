import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../api";
import { setAuthToken } from "../../helper/utils";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const getEstimateDetail = createAsyncThunk(
  "estimate/getEstimateDetail",
  async (id = 0, { rejectWithValue }) => {
    try {
      const response = await getApi(`api/estimates/${id}`);
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

const getEstimateDetailSlice = createSlice({
  name: "getEstimateDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEstimateDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getEstimateDetail.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(getEstimateDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default getEstimateDetailSlice.reducer;
