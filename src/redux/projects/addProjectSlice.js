import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../api";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const addProject = createAsyncThunk(
  "auth/addProject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postApi("api/projects", data);
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

const addProjectSlice = createSlice({
  name: "addProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
  },
});

export default addProjectSlice.reducer;
