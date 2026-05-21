import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import {
  fetchCurrentUserProfile,
  updateCurrentUser,
} from "../../uesrs/redux/userThunk";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../lib/toast";

function ProfileForm() {
  const dispatch = useDispatch();

  const { profile, isLoading, error } = useSelector((state) => state.user);

  const defaultValues = useMemo(
    () => ({
      name: profile?.name || "",
      email: profile?.email || "",
    }),
    [profile],
  );

  const [overrides, setOverrides] = useState({});
  const [formError, setFormError] = useState("");

  const formData = {
    ...defaultValues,
    ...overrides,
  };

  useEffect(() => {
    dispatch(fetchCurrentUserProfile());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOverrides((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      setFormError("Name is required.");
      return;
    }

    setFormError("");

    const result = await dispatch(
      updateCurrentUser({
        name: trimmedName,
      })
    );

    if (result?.success) {
      showSuccessToast("Profile updated");
      setOverrides({});
    } else if (result?.error) {
      showErrorToast(result.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Update your account profile
        </p>
      </div>

      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        disabled
      />

      {(formError || error) && (
        <p className="text-sm text-red-500">{formError || error}</p>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
export default ProfileForm;
