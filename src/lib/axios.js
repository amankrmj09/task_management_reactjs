import axios from "axios";

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || "";
  const cleanUrl = envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
  return `${cleanUrl}/api`;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

// Helper: unwrap the { data: ... } envelope
// if the backend wraps responses.
export const extractData = (response) => {
  const body = response.data;
  if (
    body &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    "data" in body
  ) {
    if ("pagination" in body) {
      return { content: body.data, ...body.pagination };
    }
    return body.data;
  }
  return body;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post(
          `${getBaseUrl()}/auth/refresh`,
          {
            refreshToken,
          }
        );

        const refreshBody = response.data;
        const newAccessToken =
          refreshBody?.data?.token ||
          refreshBody?.token;

        localStorage.setItem(
          "token",
          newAccessToken
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;