import { Navigate, Outlet } from "react-router-dom";

const OwnerRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role.toLowerCase() !== "owner") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default OwnerRoute;
