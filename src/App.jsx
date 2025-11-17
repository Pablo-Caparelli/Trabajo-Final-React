import React from "react";
import ChatScreen from "./Screens/ChatScreen/ChatScreen.jsx";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/chat/:chat_id" element={<ChatScreen />} />
      </Routes>

      {/* Contenedor de Toasts */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
