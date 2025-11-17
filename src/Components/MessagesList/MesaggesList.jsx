import React from "react";
import "./MesaggesList.css";

const MessagesList = ({ messages }) => {
  return (
    <div className="messages-container">
      {messages.length === 0 ? (
        <span>Aún no hay mensajes</span>
      ) : (
        messages.map((message) => {
          return (
            <div
              key={message.id}
              className={
                message.author_id === 50
                  ? "message message-mine"
                  : "message message-other"
              }
            >
              <h3>{message.author_name}</h3>
              <p>{message.content}</p>
              <span>{message.created_at}</span>
              <span>
                {message.status === "VIEWED" ? (
                  <span>Leido</span>
                ) : (
                  <span>No leido</span>
                )}
              </span>
            </div>
          );
        })
      )}
      <hr />
    </div>
  );
};

export default MessagesList;
