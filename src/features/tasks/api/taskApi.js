import axiosInstance, { extractData } from "../../../lib/axios";

export const getTasksApi = async (
  projectId,
  params
) => {
  const response = await axiosInstance.get(
    `/projects/${projectId}/tasks`,
    {
      params,
    }
  );

  return extractData(response);
};

export const getTaskApi = async (
  projectId,
  taskId
) => {
  const response = await axiosInstance.get(
    `/projects/${projectId}/tasks/${taskId}`
  );

  return extractData(response);
};

export const createTaskApi = async (
  projectId,
  payload
) => {
  const response = await axiosInstance.post(
    `/projects/${projectId}/tasks`,
    payload
  );

  return extractData(response);
};

export const updateTaskApi = async (
  projectId,
  taskId,
  payload
) => {
  const response = await axiosInstance.put(
    `/projects/${projectId}/tasks/${taskId}`,
    payload
  );

  return extractData(response);
};

export const updateTaskStatusApi =
  async (projectId, taskId, status) => {
    const response =
      await axiosInstance.patch(
        `/projects/${projectId}/tasks/${taskId}/status`,
        {
          status,
        }
      );

    return extractData(response);
  };

export const deleteTaskApi = async (
  projectId,
  taskId
) => {
  const response = await axiosInstance.delete(
    `/projects/${projectId}/tasks/${taskId}`
  );

  return extractData(response);
};

export const addTaskCommentApi =
  async (projectId, taskId, payload) => {
    const response =
      await axiosInstance.post(
        `/projects/${projectId}/tasks/${taskId}/comments`,
        payload
      );

    return extractData(response);
  };

export const deleteTaskCommentApi =
  async (
    projectId,
    taskId,
    commentId
  ) => {
    const response =
      await axiosInstance.delete(
        `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`
      );

    return extractData(response);
  };