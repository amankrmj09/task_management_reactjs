import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../routes/routeConstants";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}

export default ProtectedRoute;