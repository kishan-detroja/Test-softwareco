import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi, putApi } from "../api";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const updateEstimate = createAsyncThunk(
  "project/updateEstimate",
  async (formData, { rejectWithValue }) => {
    try {
      const { data, id } = formData;
      const response = await putApi(`api/estimates/${id}`, data);
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

const updateEstimateSlice = createSlice({
  name: "updateEstimate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateEstimate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateEstimate.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(updateEstimate.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default updateEstimateSlice.reducer;
