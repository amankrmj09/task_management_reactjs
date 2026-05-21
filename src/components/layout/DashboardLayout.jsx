import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";

import { fetchCurrentUser } from "../../features/auth/redux/authThunk";

function DashboardLayout({ children }) {
  const dispatch = useDispatch();

  const { user, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  return (
    <div className="flex h-screen overflow-hidden gap-2 bg-gray-200 p-2">
      <Sidebar />

      <main className="flex-1 overflow-y-auto rounded-xl bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;