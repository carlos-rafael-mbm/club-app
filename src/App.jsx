import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logout } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { token, accessTokenExpiration } = useSelector((state) => state.auth);

  useEffect(() => {
    const now = new Date();
    const expiration = new Date(accessTokenExpiration);

    if (token && expiration > now) {
      dispatch(
        loginSuccess({
          username: localStorage.getItem("user"),
          role: localStorage.getItem("role"),
          accessToken: token,
          refreshToken: localStorage.getItem("refreshToken"),
          accessTokenExpiration: localStorage.getItem("accessTokenExpiration"),
        })
      );
    } else if (token) {
      dispatch(logout());
    }
  }, [token, accessTokenExpiration, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
