import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Loader2, Lock, Mail} from "lucide-react";

import {Input} from "../../../components/ui/Input";

import {loginSchema} from "../utils/authValidation";
import {useAuth} from "../hooks/useAuth";
import {ROUTES} from "../../../routes/routeConstants";

function LoginForm() {
    const navigate = useNavigate();
    const {login, isLoading, error, isAuthenticated} = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors},
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                error={errors.email?.message}
                {...register("email")}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
                error={errors.password?.message}
                {...register("password")}
            />

            <div className="flex justify-end mt-0.5">
                <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-primary)] hover:opacity-80 transition-opacity"
                >
                    Forgot password?
                </Link>
            </div>

            {error && <p className="text-xs font-semibold text-[var(--color-danger)] text-center">{error}</p>}

            <div className="w-full flex justify-center items-center">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-min flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white text-sm font-semibold p-2.5 px-8 rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-1"
                >
                    {isLoading && <Loader2 size={16} className="animate-spin"/>}
                    {isLoading ? "Authenticating..." : "Login"}
                </button>
            </div>


            <p className="text-center text-xs font-medium text-[var(--text-muted)] pt-1">
                Don&apos;t have an account?{" "}
                <Link
                    to={ROUTES.SIGNUP}
                    className="text-[var(--color-primary)] font-bold hover:underline underline-offset-4"
                >
                    Create one now
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;
