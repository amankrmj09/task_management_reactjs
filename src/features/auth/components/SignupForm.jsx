import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import { signupSchema } from "../utils/authValidation";

import { useAuth } from "../hooks/useAuth";

import { ROUTES } from "../../../routes/routeConstants";

function SignupForm() {
  const navigate = useNavigate();

  const { signup, isLoading, error, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    await signup(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        autoComplete="name"
        {...register("name")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create password"
        error={errors.password?.message}
        autoComplete="new-password"
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        {...register("confirmPassword")}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating account..." : "Signup"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-medium text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
