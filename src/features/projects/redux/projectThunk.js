import {
  createProjectApi,
  deleteProjectApi,
  getProjectApi,
  getProjectsApi,
  updateProjectApi,
} from "../api/projectApi";

import {
  addProject,
  removeProject,
  setError,
  setLoading,
  setProjects,
  setSelectedProject,
  updateProject,
} from "./projectSlice";

export const fetchProjects =
  (params) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await getProjectsApi(params);

      dispatch(setProjects(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch projects"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchProject =
  (projectId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await getProjectApi(
        projectId
      );

      dispatch(setSelectedProject(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch project"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createProject =
  (payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await createProjectApi(
        payload
      );

      dispatch(addProject(data));

      return { success: true, data };
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to create project"
        )
      );

      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const editProject =
  (projectId, payload) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await updateProjectApi(
        projectId,
        payload
      );

      dispatch(updateProject(data));

      return { success: true, data };
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to update project"
        )
      );

      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteProject =
  (projectId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      await deleteProjectApi(projectId);

      dispatch(removeProject(projectId));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to delete project"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };