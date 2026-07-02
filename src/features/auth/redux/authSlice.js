import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.warn("Could not parse user from localStorage", error);
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),

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

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");

      localStorage.removeItem("refreshToken");

      localStorage.removeItem("user");
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