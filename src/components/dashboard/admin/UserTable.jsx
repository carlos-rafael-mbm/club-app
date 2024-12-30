import {
  ActionButton,
  DisabledText,
  StyledTable,
  TableCell,
  TableHeader,
  TableRow,
} from "./UserTable.styles";

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
    <StyledTable>
      <thead>
        <tr>
          <TableHeader>Nombres</TableHeader>
          <TableHeader>Username</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Rol</TableHeader>
          <TableHeader>Estado</TableHeader>
          <TableHeader>Acciones</TableHeader>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role.name}</TableCell>
            <TableCell>
              {user.isActive ? "Activo" : <DisabledText>Inactivo</DisabledText>}
            </TableCell>
            <TableCell>
              {user.isActive && (
                <>
                  <ActionButton onClick={() => onEdit(user)}>
                    Editar
                  </ActionButton>
                  <ActionButton onClick={() => onDelete(user.id)}>
                    Borrar
                  </ActionButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default UserTable;
