import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, createClient } from "../../../store/clientSlice";
import ClientFormModal from "./ClientFormModal";
import {
  Button,
  Container,
  Heading,
  Message,
  StyledTable,
  TableCell,
  TableHeader,
  TableRow,
} from "./ClientTable.styles";

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
    <Container>
      <Heading>Panel de clientes</Heading>
      <Button onClick={() => setModalOpen(true)}>Agregar cliente</Button>
      {isLoading ? (
        <Message>Cargando...</Message>
      ) : (
        <>
          {!clients || clients.length <= 0 ? (
            <Message>No existen clientes registrados</Message>
          ) : (
            <StyledTable>
              <thead>
                <tr>
                  <TableHeader>Nombre</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Teléfono</TableHeader>
                  <TableHeader>Tipo</TableHeader>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.clientType.name}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          )}
        </>
      )}
      {isModalOpen && (
        <ClientFormModal
          onSave={handleAddClient}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default ClientTable;
