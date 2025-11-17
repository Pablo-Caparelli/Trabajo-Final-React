import React from "react";
import "./CreateNewMessage.css";

const CreateNewMessage = ({ createNewMessage }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formulario = event.target;
    const message_value = formulario.message.value;
    createNewMessage(message_value);
    //Limpia los campos del formulario
    formulario.reset();
  };
  return (
    <form onSubmit={handleSubmit} className="new-message-form">
      <label htmlFor="message" className="message-label">
        Mensaje:
      </label>
      <textarea
        name="message"
        id="message"
        placeholder="Ingrese el mensaje"
        className="message-input"
      />
      <button type="submit" className="send-button">
        Enviar
      </button>
    </form>
  );
};

export default CreateNewMessage;
