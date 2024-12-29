/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientTypes } from "../../../store/clientTypeSlice";

const ClientFormModal = ({ onSave, onClose }) => {
  const dispatch = useDispatch();
  const { list: clientTypes, isLoading: isClientTypesLoading } = useSelector(
    (state) => state.clientType
  );

  useEffect(() => {
    if (clientTypes.length === 0) {
      dispatch(fetchClientTypes());
    }
  }, [dispatch, clientTypes]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clientTypeId: "",
  });

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
        <h2>Agregar cliente</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombres"
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
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
        <select
          name="clientTypeId"
          value={formData.clientTypeId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona Tipo de cliente</option>
          {isClientTypesLoading ? (
            <option>Cargando...</option>
          ) : (
            clientTypes.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.name}
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

export default ClientFormModal;
