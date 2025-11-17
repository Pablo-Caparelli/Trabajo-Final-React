import { Link } from "react-router-dom";
import AddNewContact from "../AddNewContact/AddNewContact";
import "./ChatList.css";

const ChatList = ({ contacts, addNewContact, deleteContact }) => {
  return (
    <div className="chatlist-container">
      {contacts.map((contact) => (
        <Link
          to={"/chat/" + contact.id}
          key={contact.id}
          className="contact-card"
        >
          <img className="contact-img" src={contact.profile_picture} />

          <div className="contact-info">
            <h2>{contact.name}</h2>
            <span>Última conexión: {contact.last_connection}</span>
          </div>
          <button
            className="delete-button"
            onClick={() => {
              const confirmDelete = window.confirm(
                "¿Está seguro que quiere eliminar este contacto?"
              );

              if (confirmDelete) {
                deleteContact(contact.id);
              }
            }}
          >
            Eliminar contacto
          </button>
        </Link>
      ))}

      <AddNewContact addNewContact={addNewContact} />
    </div>
  );
};

export default ChatList;
