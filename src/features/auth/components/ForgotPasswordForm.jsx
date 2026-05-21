import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import { forgotPasswordSchema } from "../utils/authValidation";
import { forgotPassword } from "../redux/authThunk";

function ForgotPasswordForm({ onSubmit }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [submittedEmail, setSubmittedEmail] = useState("");

  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data) => {
    setSubmitError("");

    try {
      let result = null;

      if (onSubmit) {
        result = await onSubmit(data);
      } else {
        result = await dispatch(
          forgotPassword(data.email)
        );
      }

      if (result?.success === false) {
        setSubmitError(
          result.error ||
            "Failed to send reset email"
        );
        return;
      }

      setSubmittedEmail(data.email);
    } catch (error) {
      setSubmitError(error?.message || "Failed to send reset email");
    }
  };

  if (submittedEmail) {
    return (
      <div className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
        We sent a reset link to{" "}
        <span className="font-semibold">{submittedEmail}</span>. Please check
        your inbox.
      </div>
    );
  }

  const isBusy = isSubmitting || isLoading;

  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className="space-y-5"
    >
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      {(submitError || error) && (
        <p className="text-sm text-red-500">
          {submitError || error}
        </p>
      )}

      <Button type="submit" disabled={isBusy} className="w-full">
        {isBusy ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
