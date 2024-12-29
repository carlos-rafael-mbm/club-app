/* eslint-disable react/prop-types */
const AccessLogModal = ({ client, onRegister, onClose }) => {
  const handleRegister = () => {
    onRegister(client.id);
    onClose();
  };

  return (
    <div>
      <h2>Register Entry for {client.name}</h2>
      <button onClick={handleRegister}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AccessLogModal;
