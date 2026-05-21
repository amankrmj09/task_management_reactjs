import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: null,
  adminStats: null,
  projectStats: null,

  isLoading: false,

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    setDashboardStats: (state, action) => {
      state.stats = action.payload;
    },

    setAdminStats: (state, action) => {
      state.adminStats = action.payload;
    },

    setProjectStats: (state, action) => {
      state.projectStats = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDashboardStats,
  setAdminStats,
  setProjectStats,
  setLoading,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;