export const selectProjectsState = (state) =>
  state.projects;

export const selectProjects = (state) =>
  state.projects.projects;

export const selectSelectedProject = (state) =>
  state.projects.selectedProject;

export const selectProjectById =
  (projectId) => (state) =>
    state.projects.projects.find(
      (project) => project.id === projectId
    );

export const selectProjectsLoading = (state) =>
  state.projects.isLoading;

export const selectProjectsError = (state) =>
  state.projects.error;
