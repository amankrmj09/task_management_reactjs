import axiosInstance, { extractData } from "../../../lib/axios";

export const getUsersApi = async (
  page = 0,
  size = 10
) => {
  const response = await axiosInstance.get(
    "/users",
    {
      params: {
        page,
        size,
      },
    }
  );

  return extractData(response);
};

export const updateUserRoleApi =
  async (userId, role) => {
    const response =
      await axiosInstance.put(
        `/users/${userId}/role`,
        {
          role,
        }
      );

    return extractData(response);
  };

export const deleteUserApi = async (
  userId
) => {
  const response = await axiosInstance.delete(
    `/users/${userId}`
  );

  return extractData(response);
};