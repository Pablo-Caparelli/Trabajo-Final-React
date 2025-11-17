import React from "react";
import "./AddNewContact.css";

const AddNewContact = ({ addNewContact }) => {
  const handleSubmitNewContactForm = (event) => {
    event.preventDefault();
    const formulario = event.target;
    const name_value = formulario.name.value;
    const image_value = formulario.image.value;

    addNewContact(name_value, image_value);

    formulario.reset();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmitNewContactForm}>
      <h2 className="form-title">Crear nuevo contacto</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre: </label>
        <input
          name="name"
          id="name"
          placeholder="Ingresa el nombre del nuevo contacto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">URL Imagen:</label>
        <input
          name="image"
          id="image"
          placeholder="Pegá aquí la URL"
          required
          style={{ width: "100%" }}
        />
      </div>
      <button className="btn-blue" type="submit">
        Crear contacto
      </button>
    </form>
  );
};

export default AddNewContact;
