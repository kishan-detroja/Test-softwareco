import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../api";
import { setAuthToken } from "../../helper/utils";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const getProjectDetail = createAsyncThunk(
  "auth/getProjectDetail",
  async (id = 0, { rejectWithValue }) => {
    try {
      const response = await getApi(`api/projects/${id}`);
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

const getProjectDetailSlice = createSlice({
  name: "getProjectDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProjectDetail.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(getProjectDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default getProjectDetailSlice.reducer;
