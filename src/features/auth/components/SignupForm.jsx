import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";

import { Input } from "../../../components/ui/Input";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Input
        label="Name"
        placeholder="Enter your name"
        icon={User}
        error={errors.name?.message}
        autoComplete="name"
        {...register("name")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={Mail}
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create password"
        icon={Lock}
        error={errors.password?.message}
        autoComplete="new-password"
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        icon={Lock}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        {...register("confirmPassword")}
      />

      {error && <p className="text-xs font-semibold text-[var(--color-danger)] text-center">{error}</p>}

      <button 
        type="submit" 
        disabled={isLoading} 
        className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white text-sm font-semibold p-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-1"
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {isLoading ? "Creating account..." : "Signup"}
      </button>

      <p className="text-center text-xs font-medium text-[var(--text-muted)] pt-1">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="text-[var(--color-primary)] font-bold hover:underline underline-offset-4"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
