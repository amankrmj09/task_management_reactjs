import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  logoutUser,
  signupUser,
} from "../redux/authThunk";

export const useAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const login = (data) => dispatch(loginUser(data));

  const signup = (data) => dispatch(signupUser(data));

  const signout = () => dispatch(logoutUser());

  return {
    ...auth,
    login,
    signup,
    signout,
  };
};