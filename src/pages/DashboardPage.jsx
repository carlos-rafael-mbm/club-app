import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import AdminPanel from "../components/dashboard/admin/AdminPanel";
import StaffPanel from "../components/dashboard/staff/StaffPanel";
import Navbar from "../components/dashboard/common/Navbar";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      {role === "Admin" && <AdminPanel />}
      {role === "Personal" && <StaffPanel />}
    </div>
  );
};

export default DashboardPage;
