import { useSelector } from "react-redux";

function Topbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Team Task Manager
      </h2>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium text-gray-800">
            {user?.name || "User"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.role || "Member"}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}

export default Topbar;