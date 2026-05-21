import { useDispatch, useSelector } from "react-redux";

import {
  createProject,
  deleteProject,
  editProject,
  fetchProject,
  fetchProjects,
} from "../redux/projectThunk";

export const useProjects = () => {
  const dispatch = useDispatch();

  const {
    projects,
    selectedProject,
    isLoading,
    error,
  } = useSelector((state) => state.projects);

  const getProjects = (params) => dispatch(fetchProjects(params));

  const getProject = (projectId) =>
    dispatch(fetchProject(projectId));

  const addProject = (payload) =>
    dispatch(createProject(payload));

  const updateProject = (projectId, payload) =>
    dispatch(editProject(projectId, payload));

  const removeProject = (projectId) =>
    dispatch(deleteProject(projectId));

  return {
    projects,
    selectedProject,
    isLoading,
    error,
    getProjects,
    getProject,
    addProject,
    updateProject,
    removeProject,
  };
};
