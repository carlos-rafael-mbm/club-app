import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RedirectToDashboard = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Redirige al dashboard si está autenticado
  return <Navigate to="/dashboard" replace />;
};

export default RedirectToDashboard;
