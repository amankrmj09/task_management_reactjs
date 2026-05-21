import AuthWrapper from "../components/AuthWrapper";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <AuthWrapper title="Welcome Back" subtitle="Login to continue">
      <LoginForm />
    </AuthWrapper>
  );
}

export default LoginPage;
