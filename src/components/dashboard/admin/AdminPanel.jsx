import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  editUser,
  removeUser,
} from "../../../store/userSlice";
import UserTable from "./UserTable";
import UserFormModal from "./UserFormModal";
import {
  AdminPanelContainer,
  Button,
  LoadingMessage,
  Title,
} from "./AdminPanel.styles";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { list: users, isLoading } = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = (user) => {
    dispatch(createUser(user));
    setModalOpen(false);
  };

  const handleEditUser = (user) => {
    dispatch(editUser(user));
    setEditUserData(null);
    setModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <AdminPanelContainer>
      <Title>Panel de usuarios</Title>
      <Button onClick={() => setModalOpen(true)}>Agregar usuario</Button>
      {isLoading ? (
        <LoadingMessage>Cargando...</LoadingMessage>
      ) : (
        <UserTable
          users={users}
          onEdit={(user) => {
            setEditUserData(user);
            setModalOpen(true);
          }}
          onDelete={handleDeleteUser}
        />
      )}
      {isModalOpen && (
        <UserFormModal
          user={editUserData}
          onSave={(user) =>
            editUserData ? handleEditUser(user) : handleAddUser(user)
          }
          onClose={() => setModalOpen(false)}
        />
      )}
    </AdminPanelContainer>
  );
};

export default AdminPanel;
