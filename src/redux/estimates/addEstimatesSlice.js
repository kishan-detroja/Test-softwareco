import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../api";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const addEstimates = createAsyncThunk(
  "estimation/addEstimates",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postApi("api/estimates", data);
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

const addEstimatesSlice = createSlice({
  name: "addEstimates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEstimates.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addEstimates.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(addEstimates.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default addEstimatesSlice.reducer;
