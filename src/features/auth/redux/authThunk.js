import {
  forgotPasswordApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from "../api/authApi";

import {
  logout,
  setCredentials,
  setError,
  setLoading,
  setUser,
} from "./authSlice";

import axiosInstance, { extractData } from "../../../lib/axios";

export const registerUser =
  (credentials) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const { confirmPassword, ...payload } =
        credentials;

      const data = await registerUserApi(
        payload
      );

      dispatch(setError(null));

      const loginResult = await dispatch(
        loginUser({
          email: credentials.email,
          password: credentials.password,
        })
      );

      if (loginResult?.success === false) {
        return loginResult;
      }

      return { success: true, data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed";

      dispatch(
        setError(
          errorMessage
        )
      );

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signupUser = (credentials) =>
  registerUser(credentials);

export const loginUser =
  (credentials) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await loginUserApi(
        credentials
      );

      dispatch(setCredentials(data));

      await dispatch(fetchCurrentUser());

      dispatch(setError(null));

      return { success: true, data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed";

      dispatch(
        setError(
          errorMessage
        )
      );

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchCurrentUser =
  () => async (dispatch) => {
    try {
      const response = await axiosInstance.get(
        "/users/me"
      );

      dispatch(setUser(extractData(response)));
      dispatch(setError(null));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch user"
        )
      );
    }
  };

export const forgotPassword =
  (email) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      await forgotPasswordApi({
        email,
      });

      dispatch(setError(null));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset email";

      dispatch(setError(errorMessage));

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logoutUser =
  () => async (dispatch, getState) => {
    try {
      const refreshToken =
        getState().auth.refreshToken;

      if (refreshToken) {
        await logoutUserApi(refreshToken);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(logout());
    }
  };
