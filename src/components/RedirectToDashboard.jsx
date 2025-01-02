import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RedirectToDashboard = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default RedirectToDashboard;
