import axiosInstance, { extractData } from "../../../lib/axios";

export const getCurrentUserApi =
  async () => {
    const response = await axiosInstance.get(
      "/users/me"
    );

    return extractData(response);
  };

export const updateCurrentUserApi =
  async (payload) => {
    const response = await axiosInstance.put(
      "/users/me",
      payload
    );

    return extractData(response);
  };

export const changePasswordApi =
  async (payload) => {
    const response = await axiosInstance.post(
      "/users/change-password",
      payload
    );

    return extractData(response);
  };
