import { NavbarContainer, Title, LogoutButton } from "./Navbar.styles";
import PropTypes from "prop-types";

const Navbar = ({ user, handleLogout }) => {
  return (
    <NavbarContainer>
      <Title>Bienvenido, {user || "Invitado"}!</Title>
      <LogoutButton onClick={handleLogout}>Salir</LogoutButton>
    </NavbarContainer>
  );
};

Navbar.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
