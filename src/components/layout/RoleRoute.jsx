import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../routes/routeConstants";

function RoleRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
}

export default RoleRoute;