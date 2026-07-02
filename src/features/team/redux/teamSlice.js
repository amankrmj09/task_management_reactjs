import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },
  isLoading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.members = payload;
      } else {
        state.members = payload.content || [];
        state.pagination = {
          page: payload.pageNumber || 0,
          size: payload.pageSize || 10,
          totalPages: payload.totalPages || 0,
          totalElements: payload.totalElements || 0,
        };
      }
    },

    addMember: (state, action) => {
      state.members.push(action.payload);
    },

    updateMember: (state, action) => {
      state.members = state.members.map(
        (member) =>
          member.id === action.payload.id
            ? action.payload
            : member
      );
    },

    removeMember: (state, action) => {
      state.members = state.members.filter(
        (member) =>
          member.id !== action.payload
      );
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
  setMembers,
  addMember,
  updateMember,
  removeMember,
  setLoading,
  setError,
} = teamSlice.actions;

export default teamSlice.reducer;