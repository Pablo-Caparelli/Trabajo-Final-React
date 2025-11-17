import MessagesList from "../MessagesList/MesaggesList";
import CreateNewMessage from "../CreateNewMessage/CreateNewMessage";
import "./ChatDetail.css";

const ChatDetail = ({ chatDetail, createNewMessage }) => {
  return (
    <div className="chat-detail">
      {/* Lista de mensajes */}
      <MessagesList messages={chatDetail.messages} />

      {/* Crear nuevo mensaje */}
      <CreateNewMessage createNewMessage={createNewMessage} />
    </div>
  );
};

export default ChatDetail;
