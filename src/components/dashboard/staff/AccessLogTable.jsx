import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../../store/clientSlice";
import {
  addEntry,
  addExit,
  fetchAccessLogs,
} from "../../../store/accessLogSlice";
import {
  Button,
  Container,
  FilterContainer,
  LoadingMessage,
  Select,
  StyledTable,
  TableCell,
  TableHeader,
  TableRow,
  Title,
} from "./AccessLogTable.styles";
import { format } from "date-fns";

const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  } catch {
    return "Invalid Date";
  }
};

const AccessLogTable = () => {
  const dispatch = useDispatch();

  const { list: accessLogs, isLoading } = useSelector(
    (state) => state.accessLog
  );
  const { list: clients, isLoading: isClientsLoading } = useSelector(
    (state) => state.client
  );

  const [selectedClientId, setSelectedClientId] = useState("");
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (selectedClientId || filters.startDate || filters.endDate) {
      dispatch(
        fetchAccessLogs({
          clientId: selectedClientId,
          startDate: filters.startDate,
          endDate: filters.endDate,
        })
      );
    }
  }, [dispatch, selectedClientId, filters]);

  const handleRegisterEntry = () => {
    if (selectedClientId) {
      dispatch(
        addEntry({
          clientId: selectedClientId,
          entryTime: new Date().toISOString(),
        })
      );
    } else {
      alert("Por favor, selecciona un cliente para marcar su entrada.");
    }
  };

  const handleRegisterExit = (id) => {
    const updatedLog = { accessLogId: id, exitTime: new Date().toISOString() };
    dispatch(addExit(updatedLog));
  };

  return (
    <Container>
      <Title>Ingreso al club</Title>
      <FilterContainer>
        <label>Selecciona un cliente: </label>
        {isClientsLoading ? (
          <LoadingMessage>Cargando clientes...</LoadingMessage>
        ) : (
          <Select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
          >
            <option value="">Clientes</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </Select>
        )}
        <Button onClick={handleRegisterEntry} disabled={!selectedClientId}>
          Registrar entrada
        </Button>
      </FilterContainer>
      <FilterContainer>
        <label>Fecha inicio: </label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />
        <label>Fecha fin: </label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        <button onClick={() => dispatch(fetchAccessLogs(filters))}>
          Buscar
        </button>
      </FilterContainer>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>Fecha/Hora de ingreso</TableHeader>
              <TableHeader>Fecha/Hora de salida</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody>
            {accessLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{formatDate(log.entryTime)}</TableCell>
                <TableCell>
                  {log.exitTime ? formatDate(log.exitTime) : ""}
                </TableCell>
                <TableCell>
                  {!log.exitTime && (
                    <Button onClick={() => handleRegisterExit(log.id)}>
                      Marcar salida
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </Container>
  );
};

export default AccessLogTable;
