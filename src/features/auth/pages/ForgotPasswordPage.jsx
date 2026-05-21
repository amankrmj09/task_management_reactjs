import { Link } from "react-router-dom";

import AuthWrapper from "../components/AuthWrapper";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

import { ROUTES } from "../../../routes/routeConstants";

function ForgotPasswordPage() {
  return (
    <AuthWrapper
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
      footer={
        <p className="text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}

export default ForgotPasswordPage;
