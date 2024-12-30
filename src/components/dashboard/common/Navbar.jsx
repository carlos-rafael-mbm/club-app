/* eslint-disable react/prop-types */
import { NavbarContainer, Title, LogoutButton } from "./Navbar.styles";

const Navbar = ({ user, handleLogout }) => {
  return (
    <NavbarContainer>
      <Title>Bienvenido, {user || "Invitado"}!</Title>
      <LogoutButton onClick={handleLogout}>Salir</LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
