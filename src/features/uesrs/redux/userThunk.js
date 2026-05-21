import {
  getCurrentUserApi,
  updateCurrentUserApi,
  changePasswordApi,
} from "../api/userApi";

import {
  setError,
  setLoading,
  setProfile,
} from "./userSlice";

export const fetchCurrentUserProfile =
  () => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data =
        await getCurrentUserApi();

      dispatch(setProfile(data));
      dispatch(setError(null));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch profile"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateCurrentUser =
  (payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data =
        await updateCurrentUserApi(
          payload
        );

      dispatch(setProfile(data));
      dispatch(setError(null));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update profile";

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

export const changePassword =
  (payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      await changePasswordApi(payload);

      dispatch(setError(null));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to change password";

      dispatch(setError(errorMessage));

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };
