import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./MesaggesList.css";

const MessagesList = ({ messages, deleteMessage }) => {
  console.log("MENSAJES RENDER", messages);

  return (
    <div className="messages-container">
      {messages.length === 0 ? (
        <span>Aún no hay mensajes</span>
      ) : (
        messages.map((message) => (
          <div
            //key={message.id}
            key={`${message.id}-${message.created_at}-${message.author_id}`}
            className={
              message.author_id === 50
                ? "message message-mine"
                : "message message-other"
            }
          >
            <div className="message-header">
              <h3>{message.author_name}</h3>
              {/* Botón eliminar */}
              <button
                className="delete-message-btn"
                onClick={() => deleteMessage(message.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>

            <p>{message.content}</p>
            <div className="message-footer">
              <span>{message.created_at}</span>
              <span>{message.status === "VIEWED" ? "Leído" : "No leído"}</span>
            </div>
          </div>
        ))
      )}
      <hr />
    </div>
    // <div>
    //   {messages.length === 0 ? (
    //     <span>Aun no has chateado, envia un mensaje para hacerlo</span>
    //   ) : (
    //     messages.map((message) => {
    //       return (
    //         <div>
    //           <h3>{message.author_name}</h3>
    //           <p>{message.content}</p>
    //           <span>{message.created_at}</span>
    //           <span>
    //             {message.status === "VIEWED" ? (
    //               <span>Leido</span>
    //             ) : (
    //               <span>No leido</span>
    //             )}
    //           </span>
    //         </div>
    //   );
    // })
    //   )}
    //   <hr />
    // </div>
  );
};

export default MessagesList;
