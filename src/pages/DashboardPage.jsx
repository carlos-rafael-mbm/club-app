import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import AdminPanel from "../components/dashboard/admin/AdminPanel";
import StaffPanel from "../components/dashboard/staff/StaffPanel";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Bienvenido, {user || "Guest"}!</h1>
      <button onClick={handleLogout}>Salir</button>
      {role === "Admin" && <AdminPanel />}
      {role === "Personal" && <StaffPanel />}
    </div>
  );
};

export default DashboardPage;
