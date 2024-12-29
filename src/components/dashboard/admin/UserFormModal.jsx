/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../store/roleSlice";

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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{user ? "Editar usuario" : "Agregar usuario"}</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombres"
          required
        />
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Usuario"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <select
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
        </select>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UserFormModal;
