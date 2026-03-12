import { Navigate, Outlet } from "react-router-dom";

const PlayerRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role.toLowerCase() === "owner") {
    return <Navigate to="/owner" replace />;
  }

  return <Outlet />;
};

export default PlayerRoute;
