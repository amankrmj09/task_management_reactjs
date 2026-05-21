import { useDispatch, useSelector } from "react-redux";

import {
  changeUserRole,
  deleteUser,
  fetchMembers,
} from "../redux/teamThunk";

export const useTeam = () => {
  const dispatch = useDispatch();

  const { members, isLoading, error } =
    useSelector((state) => state.team);

  const getMembers = (page, size) =>
    dispatch(fetchMembers(page, size));

  const updateRole = (userId, role) =>
    dispatch(changeUserRole(userId, role));

  const removeMember = (userId) =>
    dispatch(deleteUser(userId));

  return {
    members,
    isLoading,
    error,
    getMembers,
    updateRole,
    removeMember,
  };
};
