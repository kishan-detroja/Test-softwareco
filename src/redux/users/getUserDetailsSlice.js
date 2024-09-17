import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../api";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getApi(`api/users/${id}`);
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

const getUserDetailsSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default getUserDetailsSlice.reducer;
