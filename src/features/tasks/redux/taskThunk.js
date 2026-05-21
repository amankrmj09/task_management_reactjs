import {
  addTaskCommentApi,
  createTaskApi,
  deleteTaskApi,
  deleteTaskCommentApi,
  getTaskApi,
  getTasksApi,
  updateTaskApi,
  updateTaskStatusApi,
} from "../api/taskApi";

import {
  addTask,
  removeTask,
  setError,
  setLoading,
  setSelectedTask,
  setTasks,
  updateTask,
} from "./taskSlice";

export const fetchTasks =
  (projectId, params) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await getTasksApi(
        projectId,
        params
      );

      dispatch(setTasks(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch tasks"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchTask =
  (projectId, taskId) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await getTaskApi(
        projectId,
        taskId
      );

      dispatch(setSelectedTask(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch task"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createTask =
  (projectId, payload) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await createTaskApi(
        projectId,
        payload
      );

      dispatch(addTask(data));

      return { success: true, data };
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to create task"
        )
      );

      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const editTask =
  (projectId, taskId, payload) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await updateTaskApi(
        projectId,
        taskId,
        payload
      );

      dispatch(updateTask(data));

      return { success: true, data };
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to update task"
        )
      );

      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateTaskStatus =
  (projectId, taskId, status) =>
  async (dispatch) => {
    try {
      const data =
        await updateTaskStatusApi(
          projectId,
          taskId,
          status
        );

      dispatch(updateTask(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to update status"
        )
      );
    }
  };

export const deleteTask =
  (projectId, taskId) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      await deleteTaskApi(
        projectId,
        taskId
      );

      dispatch(removeTask(taskId));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to delete task"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const addTaskComment =
  (projectId, taskId, payload) =>
  async (dispatch) => {
    try {
      await addTaskCommentApi(
        projectId,
        taskId,
        payload
      );

      dispatch(fetchTask(projectId, taskId));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to add comment"
        )
      );
    }
  };

export const deleteTaskComment =
  (projectId, taskId, commentId) =>
  async (dispatch) => {
    try {
      await deleteTaskCommentApi(
        projectId,
        taskId,
        commentId
      );

      dispatch(fetchTask(projectId, taskId));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to delete comment"
        )
      );
    }
  };