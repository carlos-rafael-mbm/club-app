import LoginForm from "../components/login/LoginForm";
import { PageContainer, Title } from "./LoginPage.styles";

const LoginPage = () => {
  return (
    <PageContainer>
      <Title>Control de Ingresos y salidas al Club Lilab</Title>
      <LoginForm />
    </PageContainer>
  );
};

export default LoginPage;
