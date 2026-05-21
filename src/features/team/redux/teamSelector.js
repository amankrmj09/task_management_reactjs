export const selectTeamState = (state) =>
  state.team;

export const selectTeamMembers = (state) =>
  state.team.members;

export const selectTeamMemberById =
  (memberId) => (state) =>
    state.team.members.find(
      (member) => member.id === memberId
    );

export const selectTeamLoading = (state) =>
  state.team.isLoading;

export const selectTeamError = (state) =>
  state.team.error;
