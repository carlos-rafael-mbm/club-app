import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../../store/clientSlice";
import {
  addEntry,
  addExit,
  fetchAccessLogs,
} from "../../../store/accessLogSlice";

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
    <div>
      <h3>Ingreso al club</h3>
      <div>
        <label>Selecciona un cliente: </label>
        {isClientsLoading ? (
          <p>Cargando clientes...</p>
        ) : (
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
          >
            <option value="">Clientes</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        )}
        <button onClick={handleRegisterEntry} disabled={!selectedClientId}>
          Registrar entrada
        </button>
      </div>
      <div>
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
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accessLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.clientId}</td>
                <td>{log.entryTime}</td>
                <td>{log.exitTime || ""}</td>
                <td>
                  {!log.exitTime && (
                    <button onClick={() => handleRegisterExit(log.id)}>
                      Marcar salida
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccessLogTable;
