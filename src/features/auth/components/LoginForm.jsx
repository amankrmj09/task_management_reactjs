import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import { loginSchema } from "../utils/authValidation";

import { useAuth } from "../hooks/useAuth";

import { ROUTES } from "../../../routes/routeConstants";

function LoginForm() {
  const navigate = useNavigate();

  const { login, isLoading, error, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex justify-end">
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          to={ROUTES.SIGNUP}
          className="font-medium text-blue-600 hover:underline"
        >
          Signup
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
