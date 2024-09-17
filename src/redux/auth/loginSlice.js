import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../api";
import { setAuthToken } from "../../helper/utils";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getApi("api/users", data);
      if (response.data.code === 200) {
        setAuthToken(response.data?.dataObj?.token);
      }
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

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default loginSlice.reducer;
