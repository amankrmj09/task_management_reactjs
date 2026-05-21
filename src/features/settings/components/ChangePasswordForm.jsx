import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import { changePassword } from "../../uesrs/redux/userThunk";
import { showErrorToast, showSuccessToast } from "../../../lib/toast";

function ChangePasswordForm() {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword.trim() ||
      !formData.newPassword.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setFormError("All fields are required.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");

    const result = await dispatch(
      changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }),
    );

    if (result?.success) {
      showSuccessToast("Password updated");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else if (result?.error) {
      showErrorToast(result.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
    >
      <Input
        label="Current Password"
        type="password"
        name="currentPassword"
        value={formData.currentPassword}
        onChange={handleChange}
      />

      <Input
        label="New Password"
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      {(formError || error) && (
        <p className="text-sm text-red-500">{formError || error}</p>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Change Password"}
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
