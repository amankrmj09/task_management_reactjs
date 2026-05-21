import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../routes/routeConstants";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    {
      label: "Dashboard",
      path: ROUTES.DASHBOARD,
    },
    {
      label: "Projects",
      path: ROUTES.PROJECTS,
    },
    {
      label: "Tasks",
      path: ROUTES.TASKS,
    },
    {
      label: "Settings",
      path: ROUTES.SETTINGS,
    },
  ];

  if (user?.role === "ADMIN") {
    navItems.splice(3, 0, {
      label: "Team",
      path: ROUTES.TEAM,
    });
  }

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col rounded-xl bg-white shadow-sm">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Task Manager
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User details moved from Topbar */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role || "Member"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;