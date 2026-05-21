import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/redux/authSlice";
import dashboardReducer from "../features/dashboard/redux/dashboardSlice";
import projectReducer from "../features/projects/redux/projectSlice";
import taskReducer from "../features/tasks/redux/taskSlice";
import teamReducer from "../features/team/redux/teamSlice";
import userReducer from "../features/uesrs/redux/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,

  dashboard: dashboardReducer,

  projects: projectReducer,

  tasks: taskReducer,

  team: teamReducer,

  user: userReducer,
});

export default rootReducer;
