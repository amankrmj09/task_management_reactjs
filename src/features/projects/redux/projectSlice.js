import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  selectedProject: null,

  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },

  isLoading: false,

  error: null,
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    setProjects: (state, action) => {
      const payload = action.payload;

      if (Array.isArray(payload)) {
        state.projects = payload;
      } else {
        state.projects = payload.content || [];

        state.pagination = {
          page: payload.page || 0,
          size: payload.size || 10,
          totalPages: payload.totalPages || 0,
          totalElements:
            payload.totalElements || 0,
        };
      }
    },

    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },

    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },

    updateProject: (state, action) => {
      state.projects = state.projects.map(
        (project) =>
          project.id === action.payload.id
            ? action.payload
            : project
      );

      if (
        state.selectedProject?.id ===
        action.payload.id
      ) {
        state.selectedProject = action.payload;
      }
    },

    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );

      if (
        state.selectedProject?.id ===
        action.payload
      ) {
        state.selectedProject = null;
      }
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProjects,
  setSelectedProject,
  addProject,
  updateProject,
  removeProject,
  setLoading,
  setError,
} = projectSlice.actions;

export default projectSlice.reducer;