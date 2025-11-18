import MessagesList from "../MessagesList/MesaggesList";
import CreateNewMessage from "../CreateNewMessage/CreateNewMessage";
import "./ChatDetail.css";

const ChatDetail = ({ chatDetail, createNewMessage, deleteMessage }) => {
  if (!chatDetail) return <div>Selecciona un chat</div>;
  //const { messages } = chatDetail;

  console.log("MESSAGES:", chatDetail.messages);
  return (
    <div className="chat-detail">
      {/* Lista de mensajes */}
      <MessagesList
        messages={chatDetail.messages}
        deleteMessage={deleteMessage}
      />

      {/* Crear nuevo mensaje */}
      <CreateNewMessage createNewMessage={createNewMessage} />
    </div>
  );
};

export default ChatDetail;
