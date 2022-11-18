import { React, useState, useEffect } from "react";
import { getMessages } from "../services/messages.services";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  //Llamo a la API
  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    try {
      //busco los mensajes de la BD, y todos los mensajes los guardo en la variable response
      const response = await getMessages();
      console.log("Todos los mensajes", response);
      setMessages(response.data); // en la varibale mensajes, guardo todos los mensajes
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h4>....searching</h4>;
  }
  return (
    <div>
      <h1 className="pageTitle" >📨¡Echa un ojo!📨</h1>

      {messages.map((eachMessage) => {
        return (
          <div className="message" key={eachMessage._id}>
            ✉️
            {eachMessage.text}
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
