import React, { useEffect, useState } from "react";
import ChatList from "../../Components/ChatList/ChatList";
import { useParams } from "react-router-dom";
import { getAllContacts } from "../../services/contactService";
import ChatDetail from "../../Components/ChatDetail/ChatDetail";
import { toast } from "react-toastify";
import "./ChatScreen.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ChatScreen = () => {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatDetail, setChatDetail] = useState(null);
  const { chat_id } = useParams();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

    // ⭐ LLEVAR AUTOMÁTICAMENTE AL NUEVO CONTACTO
    navigate(`/chat/${new_contact.id}`);
  }

  function deleteContact(contactId) {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    if (chatDetail?.id === contactId) {
      const defaultContact = updatedContacts.find((c) => c.id === 1);
      if (defaultContact) {
        navigate(`/chat/1`);
      } else {
        setChatDetail(null);
      }
    }
    toast.error("Contacto eliminado correctamente");
  }

  function createNewMessage(message) {
    const new_message = {
      id: Date.now(),
      content: message,
      author_id: 50,
      author_name: "Pablo",
      created_at: new Date().toLocaleString(),
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
      created_at: new Date().toLocaleString(),
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

  useEffect(() => {
    if (!loading && contacts && contacts.length > 0) {
      // contact correspondiente al URL
      const exists = contacts.some((c) => String(c.id) === String(chat_id));

      // si no existe, redirigimos al primero
      if (!exists) {
        navigate(`/chat/${contacts[0].id}`, { replace: true });
      }
    }
  }, [contacts, chat_id, loading, navigate]);

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
