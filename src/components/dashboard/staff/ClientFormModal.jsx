import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientTypes } from "../../../store/clientTypeSlice";
import {
  Button,
  ButtonGroup,
  Form,
  Input,
  ModalContainer,
  ModalOverlay,
  Select,
  Title,
} from "./ClientFormModal.styles";
import PropTypes from "prop-types";

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
    <ModalOverlay>
      <ModalContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Agregar cliente</Title>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombres"
            required
          />
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
          <Select
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
          </Select>
          <ButtonGroup>
            <Button type="submit">Guardar</Button>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

ClientFormModal.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default ClientFormModal;
