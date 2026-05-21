import axiosInstance, { extractData } from "../../../lib/axios";

export const getMyDashboardApi = async () => {
  const response = await axiosInstance.get(
    "/dashboard/my"
  );

  return extractData(response);
};

export const getAdminDashboardApi =
  async () => {
    const response = await axiosInstance.get(
      "/dashboard/admin"
    );

    return extractData(response);
  };

export const getProjectStatsApi = async (
  projectId
) => {
  const response = await axiosInstance.get(
    `/dashboard/projects/${projectId}/stats`
  );

  return extractData(response);
};