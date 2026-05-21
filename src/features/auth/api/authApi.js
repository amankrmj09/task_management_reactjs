import axiosInstance, { extractData } from "../../../lib/axios";

export const registerUserApi = async (data) => {
  const response = await axiosInstance.post(
    "/auth/register",
    data
  );

  return extractData(response);
};

export const loginUserApi = async (data) => {
  const response = await axiosInstance.post(
    "/auth/login",
    data
  );

  return extractData(response);
};

export const forgotPasswordApi = async (
  payload
) => {
  const response = await axiosInstance.post(
    "/auth/forgot-password",
    payload
  );

  return extractData(response);
};

export const refreshTokenApi = async (
  refreshToken
) => {
  const response = await axiosInstance.post(
    "/auth/refresh",
    {
      refreshToken,
    }
  );

  return extractData(response);
};

export const logoutUserApi = async (
  refreshToken
) => {
  const response = await axiosInstance.post(
    "/auth/logout",
    {
      refreshToken,
    }
  );

  return extractData(response);
};
