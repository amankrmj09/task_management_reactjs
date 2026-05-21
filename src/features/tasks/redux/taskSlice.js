import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  selectedTask: null,

  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },

  filters: {
    status: "",
    assigneeId: "",
    priority: "",
    overdue: false,
  },

  isLoading: false,

  error: null,
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    setTasks: (state, action) => {
      const payload = action.payload;

      if (Array.isArray(payload)) {
        state.tasks = payload;
      } else {
        state.tasks = payload.content || [];

        state.pagination = {
          page: payload.page || 0,
          size: payload.size || 10,
          totalPages: payload.totalPages || 0,
          totalElements:
            payload.totalElements || 0,
        };
      }
    },

    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? action.payload
          : task
      );

      if (
        state.selectedTask?.id ===
        action.payload.id
      ) {
        state.selectedTask = action.payload;
      }
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );

      if (
        state.selectedTask?.id ===
        action.payload
      ) {
        state.selectedTask = null;
      }
    },

    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    resetFilters: (state) => {
      state.filters = {
        status: "",
        assigneeId: "",
        priority: "",
        overdue: false,
      };
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
  setTasks,
  setSelectedTask,
  addTask,
  updateTask,
  removeTask,
  setFilters,
  resetFilters,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;