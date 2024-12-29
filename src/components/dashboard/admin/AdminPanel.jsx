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
    <div>
      <h2>Panel de usuarios</h2>
      <button onClick={() => setModalOpen(true)}>Agregar usuario</button>
      {isLoading ? (
        <p>Cargando...</p>
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
    </div>
  );
};

export default AdminPanel;
