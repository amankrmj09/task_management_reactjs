import { useDispatch, useSelector } from "react-redux";

import {
  addTaskComment,
  createTask,
  deleteTask,
  deleteTaskComment,
  editTask,
  fetchTask,
  fetchTasks,
  updateTaskStatus,
} from "../redux/taskThunk";

export const useTasks = () => {
  const dispatch = useDispatch();

  const {
    tasks,
    selectedTask,
    pagination,
    filters,
    isLoading,
    error,
  } = useSelector((state) => state.tasks);

  const getTasks = (projectId, params) =>
    dispatch(fetchTasks(projectId, params));

  const getTask = (projectId, taskId) =>
    dispatch(fetchTask(projectId, taskId));

  const addTask = (projectId, payload) =>
    dispatch(createTask(projectId, payload));

  const updateTask = (projectId, taskId, payload) =>
    dispatch(editTask(projectId, taskId, payload));

  const changeTaskStatus = (projectId, taskId, status) =>
    dispatch(updateTaskStatus(projectId, taskId, status));

  const removeTask = (projectId, taskId) =>
    dispatch(deleteTask(projectId, taskId));

  const commentOnTask = (projectId, taskId, payload) =>
    dispatch(addTaskComment(projectId, taskId, payload));

  const removeComment = (projectId, taskId, commentId) =>
    dispatch(deleteTaskComment(projectId, taskId, commentId));

  return {
    tasks,
    selectedTask,
    pagination,
    filters,
    isLoading,
    error,
    getTasks,
    getTask,
    addTask,
    updateTask,
    changeTaskStatus,
    removeTask,
    commentOnTask,
    removeComment,
  };
};
