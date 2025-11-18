import React, { useEffect, useState } from "react";
import ChatList from "../../Components/ChatList/ChatList";
import { useParams } from "react-router-dom";
import { getAllContacts } from "../../services/contactService";
import ChatDetail from "../../Components/ChatDetail/ChatDetail";
import { toast } from "react-toastify";
import "./ChatScreen.css";
import SearchBar from "../../Components/SearchBar/SearchBar";

const ChatScreen = () => {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatDetail, setChatDetail] = useState(null);
  const { chat_id } = useParams();
  const [searchInput, setSearchInput] = useState("");

  function loadContacts() {
    setLoading(true);

    setTimeout(() => {
      const localContacts = localStorage.getItem("contacts");

      if (localContacts) {
        setContacts(JSON.parse(localContacts));
        setLoading(false);
        return;
      }

      const contactsFromService = getAllContacts();
      setContacts(contactsFromService);

      localStorage.setItem("contacts", JSON.stringify(contactsFromService));

      setLoading(false);
    }, 2000);
  }

  function addNewContact(name, imageUrl) {
    const new_contact = {
      id: Date.now(),
      user_id: Date.now(),
      name,
      profile_picture:
        imageUrl.trim() !== ""
          ? imageUrl
          : "https://i.etsystatic.com/52946191/r/il/20ab0d/6269485703/il_794xN.6269485703_jno8.jpg",
      last_connection: "ahora",
      is_connected: true,
      messages: [],
    };

    const updatedContacts = [...contacts, new_contact];

    setContacts(updatedContacts);

    // Guardar en localStorage
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    toast.success("Contacto agregado correctamente");
  }

  function deleteContact(contactId) {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    // Si estabas viendo ese chat, lo limpiamos
    if (chatDetail?.id === contactId) {
      setChatDetail(null);
    }
    toast.error("Contacto eliminado correctamente");
  }

  function createNewMessage(message) {
    const new_message = {
      id: Date.now(),
      content: message,
      author_id: 50,
      author_name: "cosme fulanito",
      created_at: "Hoy",
      status: "VIEWED",
    };

    setContacts((prev_state) => {
      const updatedContacts = prev_state.map((chat) => {
        if (Number(chat.id) === Number(chat_id)) {
          return {
            ...chat,
            messages: [...chat.messages, new_message], // 👌 NO muta
          };
        }
        return chat;
      });

      // Guardar en localStorage
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      return updatedContacts;
    });

    // Respuesta automática
    setTimeout(sendAutomaticMessage, 2000);
  }

  function sendAutomaticMessage() {
    const new_message = {
      id: Date.now(),
      content: "Tu mensaje fue recibido",
      author_id: chatDetail.user_id,
      author_name: chatDetail.name,
      created_at: "Hoy",
      status: "VIEWED",
    };

    setContacts((prev_state) => {
      const updatedContacts = prev_state.map((chat) => {
        if (Number(chat.id) === Number(chat_id)) {
          return {
            ...chat,
            messages: [...chat.messages, new_message],
          };
        }
        return chat;
      });

      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      return updatedContacts;
    });
    //setTimeout(sendAutomaticMessage, 2000);
  }

  function deleteMessage(messageId) {
    if (!chatDetail) return;

    // Actualizar contactos y mensajes del chat seleccionado
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.map((chat) => {
        if (Number(chat.id) === Number(chat_id)) {
          return {
            ...chat,
            messages: chat.messages.filter((m) => m.id !== messageId),
          };
        }
        return chat;
      });

      // Guardar en localStorage
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      return updatedContacts;
    });

    // Actualizar chatDetail para que la UI se refresque
    setChatDetail((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== messageId),
    }));
    toast.info("El mensaje fue borrado correctamente");
  }

  function loadChatDetail() {
    console.log({
      contacts,
      loading,
      chat_id,
    });
    if (contacts && !loading && chat_id) {
      const chat_selected = contacts.find(
        (contact) => Number(contact.id) === Number(chat_id)
      );
      setChatDetail(chat_selected);
    }
  }

  const filteredContacts = contacts
    ? contacts.filter((c) =>
        c.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  /*Queremos que se cargue una sola vez */
  useEffect(loadContacts, []);

  /* Cada vez que cambie la ruta revisar el chat seleccionado */
  useEffect(loadChatDetail, [chat_id, contacts]);

  return (
    <div className="chat-container">
      <div
        className={
          chat_id ? "chat-left-panel hidden-mobile" : "chat-left-panel"
        }
      >
        <h2 className="title">Lista de contactos</h2>
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        {loading ? (
          <span>Cargando contactos...</span>
        ) : (
          contacts && (
            <ChatList
              contacts={filteredContacts}
              addNewContact={addNewContact}
              deleteContact={deleteContact}
            />
          )
        )}
      </div>
      {/* //Panel derecho con el detalle del contacto
      <div className="chat-right-panel">
        {!loading &&
          (!chat_id ? (
            <h2>Aun no has seleccionado ningun chat</h2>
          ) : chatDetail ? (
            <ChatDetail
              chatDetail={chatDetail}
              createNewMessage={createNewMessage}
            />
          ) : null)}
      </div> */}
      <div className={chat_id ? "chat-main" : "chat-main hidden-mobile"}>
        {!loading &&
          (!chat_id ? (
            <>
              {" "}
              <h2 className="no-chat">Aún no has seleccionado ningún chat</h2>
              <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </>
          ) : chatDetail ? (
            <>
              {/* 🔥 HEADER DEL CONTACTO */}
              <div className="chat-header">
                <img
                  src={chatDetail.profile_picture}
                  alt={chatDetail.name}
                  className="chat-header-img"
                />
                <h2 className="chat-header-name">{chatDetail.name}</h2>
              </div>

              {chatDetail ? console.log(chatDetail) : null}
              {/* 🔥 MENSAJES */}
              <ChatDetail
                chatDetail={chatDetail}
                createNewMessage={createNewMessage}
                deleteMessage={deleteMessage}
              />
            </>
          ) : null)}
      </div>
    </div>
  );
};

export default ChatScreen;
