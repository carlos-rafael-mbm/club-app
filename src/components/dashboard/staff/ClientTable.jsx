import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, createClient } from "../../../store/clientSlice";
import ClientFormModal from "./ClientFormModal";

const ClientTable = () => {
  const dispatch = useDispatch();
  const { list: clients, isLoading } = useSelector((state) => state.client);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleAddClient = (client) => {
    dispatch(createClient(client));
    setModalOpen(false);
  };

  return (
    <div>
      <h3>Panel de clientes</h3>
      <button onClick={() => setModalOpen(true)}>Agregar cliente</button>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {!clients || clients.length <= 0 ? (
            <p>No existen clientes registrados</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.clientType.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {isModalOpen && (
        <ClientFormModal
          onSave={handleAddClient}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ClientTable;
