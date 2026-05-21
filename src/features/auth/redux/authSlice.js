import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,

  token: localStorage.getItem("token") || null,

  refreshToken:
    localStorage.getItem("refreshToken") || null,

  isAuthenticated: !!localStorage.getItem(
    "token"
  ),

  isLoading: false,

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } =
        action.payload;

      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("token", token);

      localStorage.setItem(
        "refreshToken",
        refreshToken
      );
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");

      localStorage.removeItem("refreshToken");
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
  setCredentials,
  setUser,
  logout,
  setLoading,
  setError,
} = authSlice.actions;

export default authSlice.reducer;