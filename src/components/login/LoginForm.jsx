import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import { login } from "../../services/authService";
import {
  FormContainer,
  Input,
  Button,
  ErrorMessage,
  Title,
} from "./LoginForm.styles";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ emailUsername: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const data = await login(formData);
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch {
      dispatch(loginFailure("Credenciales inválidas"));
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Ingresar</Title>
      <Input
        type="text"
        name="emailUsername"
        placeholder="Email o Nombre de usuario"
        value={formData.emailUsername}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Logueando..." : "Iniciar sesión"}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default LoginForm;
