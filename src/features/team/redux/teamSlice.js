import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],

  isLoading: false,

  error: null,
};

const teamSlice = createSlice({
  name: "team",

  initialState,

  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
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