import axiosInstance, { extractData } from "../../../lib/axios";

export const getProjectsApi = async (
  params
) => {
  const response = await axiosInstance.get(
    "/projects",
    {
      params,
    }
  );

  return extractData(response);
};

export const getProjectApi = async (
  projectId
) => {
  const response = await axiosInstance.get(
    `/projects/${projectId}`
  );

  return extractData(response);
};

export const createProjectApi = async (
  payload
) => {
  const response = await axiosInstance.post(
    "/projects",
    payload
  );

  return extractData(response);
};

export const updateProjectApi = async (
  projectId,
  payload
) => {
  const response = await axiosInstance.put(
    `/projects/${projectId}`,
    payload
  );

  return extractData(response);
};

export const deleteProjectApi = async (
  projectId
) => {
  const response = await axiosInstance.delete(
    `/projects/${projectId}`
  );

  return extractData(response);
};

export const addProjectMemberApi = async (
  projectId,
  payload
) => {
  const response = await axiosInstance.post(
    `/projects/${projectId}/members`,
    payload
  );

  return extractData(response);
};

export const removeProjectMemberApi =
  async (projectId, email) => {
    const response =
      await axiosInstance.delete(
        `/projects/${projectId}/members`,
        {
          params: { email },
        }
      );

    return extractData(response);
  };

export const searchProjectsApi = async (query) => {
  const response = await axiosInstance.get("/projects/search", {
    params: { q: query },
  });

  return extractData(response);
};

export const requestJoinProjectApi = async (projectId) => {
  const response = await axiosInstance.post(
    `/projects/${projectId}/join-requests`
  );

  return extractData(response);
};

export const getProjectJoinRequestsApi = async (projectId) => {
  const response = await axiosInstance.get(
    `/projects/${projectId}/join-requests`
  );

  return extractData(response);
};

export const updateJoinRequestStatusApi = async (projectId, requestId, status) => {
  const response = await axiosInstance.patch(
    `/projects/${projectId}/join-requests/${requestId}`,
    { status }
  );

  return extractData(response);
};