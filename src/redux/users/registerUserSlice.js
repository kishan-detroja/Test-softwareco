import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../api";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postApi("api/users", data);
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

const registerUserSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default registerUserSlice.reducer;
