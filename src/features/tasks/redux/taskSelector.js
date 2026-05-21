export const selectTasksState = (state) =>
  state.tasks;

export const selectTasks = (state) =>
  state.tasks.tasks;

export const selectSelectedTask = (state) =>
  state.tasks.selectedTask;

export const selectTaskById =
  (taskId) => (state) =>
    state.tasks.tasks.find(
      (task) => task.id === taskId
    );

export const selectTaskFilters = (state) =>
  state.tasks.filters;

export const selectTaskPagination = (state) =>
  state.tasks.pagination;

export const selectTasksLoading = (state) =>
  state.tasks.isLoading;

export const selectTasksError = (state) =>
  state.tasks.error;
