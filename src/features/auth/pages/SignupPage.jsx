import AuthWrapper from "../components/AuthWrapper";
import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <AuthWrapper title="Create Account" subtitle="Signup to get started">
      <SignupForm />
    </AuthWrapper>
  );
}

export default SignupPage;
