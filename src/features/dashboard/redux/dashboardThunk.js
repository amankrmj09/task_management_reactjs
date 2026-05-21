import {
  getAdminDashboardApi,
  getMyDashboardApi,
  getProjectStatsApi,
} from "../api/dashboardApi";

import {
  setAdminStats,
  setDashboardStats,
  setError,
  setLoading,
  setProjectStats,
} from "./dashboardSlice";

export const fetchMyDashboard =
  () => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await getMyDashboardApi();

      dispatch(setDashboardStats(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch dashboard"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchAdminDashboard =
  () => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data =
        await getAdminDashboardApi();

      dispatch(setAdminStats(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch admin dashboard"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchProjectStats =
  (projectId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await getProjectStatsApi(
        projectId
      );

      dispatch(setProjectStats(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch project stats"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };