📘 README.md — Chat App con React + LocalStorage
🗨️ ChatApp – Aplicación de Chat con Contactos y Mensajes

Esta es una aplicación de chat construida con React, que permite gestionar contactos, enviar mensajes, recibir respuestas automáticas.

🚀 Características principales
👥 Gestión de contactos

Ver lista completa de contactos guardados.

Añadir nuevos contactos con foto personalizada.

Eliminar contactos.

Persistencia automática en localStorage.

💬 Chat funcional

Enviar mensajes reales a cada contacto.

Cada contacto tiene su propio historial con timestamps.

Los mensajes se guardan en localStorage.

Respuesta automática simulada luego de un delay.

🔎 Buscador

Barra de búsqueda para filtrar contactos por nombre.

📱 Diseño responsive

En pantallas pequeñas:

Se muestra solo lista de contactos o chat activo, nunca ambos.

La clase hidden-mobile controla qué panel se ve.

En escritorio:

Vista dividida (contactos a la izquierda, chat a la derecha).

🧹 Gestión de mensajes

Ver mensajes enviados y recibidos.

Eliminar mensajes individuales.

Indicador de leído/no leído.

📦 Tecnologías utilizadas

React.js

React Router DOM

FontAwesome

React Toastify

localStorage para persistencia

📂 Estructura del proyecto
src/
├── Components/
│ ├── AddNewContact/
│ ├── ChatDetail/
│ ├── ChatList/
│ ├── CreateNewMessage/
│ ├── MessagesList/
│ └── SearchBar/
├── Screens/
│ └── ChatScreen/
├── services/
│ └── contactService.js
├── App.jsx
└── main.jsx

🔧 Instalación

Clonar el repositorio:

git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto

Instalar dependencias:

npm install

Ejecutar la app:

npm run dev

🕹️ Cómo usar la aplicación
1️⃣ Lista de contactos

En el panel izquierdo (desktop) se listan todos los contactos.

Podés agregar nuevos contactos.

Podés eliminarlos.

2️⃣ Seleccionar un chat

Al hacer clic en un contacto, se abre el chat a la derecha.

Si estás en móvil, la lista desaparece y solo se ve el chat.

3️⃣ Envío de mensajes

Escribí un mensaje en el input inferior y presioná Enviar.

El contacto responderá automáticamente luego de 2 segundos.

4️⃣ Búsqueda

La barra superior permite filtrar contactos instantáneamente.

🛠️ Funciones clave
loadContacts()

Carga contactos desde localStorage o desde contactService.

addNewContact()

Agrega un nuevo contacto y navega automáticamente al chat recién creado.

createNewMessage()

Agrega un mensaje enviado por el usuario y dispara sendAutomaticMessage().

deleteContact()

Elimina contactos, actualiza localStorage y redirige si es necesario.

deleteMessage()

Elimina mensajes individuales sin mutar el estado.

🖼️ Capturas de pantalla

[Lista de contactos](./public/Imagen2.jpeg)
[Chat activo](./public/Imagen3.jpeg)
[Pantalla completa](./public/Imagen1.jpeg)

✍️ Autor

## 👨‍💻 Créditos del autor

- Proyecto desarrollado por: Pablo Caparelli
- Curso/Práctica de: **Trabajo Final React**
  📅 Año: **2025**
  Diplomatura en Professional Full-Stack Developer
