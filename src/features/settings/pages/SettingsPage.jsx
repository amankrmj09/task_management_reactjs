import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/common/Button";

import SettingsTabs from "../components/SettingsTabs";

import { logoutUser } from "../../auth/redux/authThunk";

import { ROUTES } from "../../../routes/routeConstants";

function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await dispatch(logoutUser());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

        <p className="mt-1 text-gray-500">Manage your account settings</p>
      </div>

      <SettingsTabs />

      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Sign Out
        </h2>

        <p className="mt-1 text-sm text-red-600">
          Sign out of your account on this device. You will need to log in again to access your data.
        </p>

        <Button
          variant="danger"
          onClick={handleSignout}
          className="mt-4"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default SettingsPage;
