import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../store/roleSlice";
import {
  Button,
  ButtonGroup,
  Form,
  Input,
  ModalContainer,
  ModalOverlay,
  Select,
  Title,
} from "./UserFormModal.styles";
import PropTypes from "prop-types";

const UserFormModal = ({ user, onSave, onClose }) => {
  const dispatch = useDispatch();
  const { list: roles, isLoading: isRolesLoading } = useSelector(
    (state) => state.role
  );

  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [dispatch, roles]);

  const [formData, setFormData] = useState(
    user
      ? {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          roleId: user.role.id,
        }
      : {
          name: "",
          username: "",
          email: "",
          password: "",
          roleId: "",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Form onSubmit={handleSubmit}>
          <Title>{user ? "Editar usuario" : "Agregar usuario"}</Title>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombres"
            required
          />
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Usuario"
            required
          />
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
          <Select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona Rol</option>
            {isRolesLoading ? (
              <option>Cargando...</option>
            ) : (
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))
            )}
          </Select>
          <ButtonGroup>
            <Button type="submit">Guardar</Button>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

UserFormModal.propTypes = {
  user: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default UserFormModal;
