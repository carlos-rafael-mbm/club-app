/* eslint-disable react/prop-types */
const UserTable = ({ users, onEdit, onDelete }) => {
  if (!users || users.length <= 0) {
    return (
      <>
        <p>No existen usuarios</p>
      </>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Username</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role.name}</td>
            <td>{user.isActive ? "Activo" : "Inactivo"}</td>
            <td>
              {user.isActive && (
                <>
                  <button onClick={() => onEdit(user)}>Editar</button>
                  <button onClick={() => onDelete(user.id)}>Borrar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
