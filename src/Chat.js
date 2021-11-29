import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "./components/Message";
import { useStateValue } from "./context/StateProvider";
import { serverLinkUrl } from "./configs/urls";
import SocketIOClient from "socket.io-client";
let socket;
function Chat() {
  const [{ user }, dispatch] = useStateValue();

  const [messages, setMessages] = useState([]);
  const handler = (event) => {
    event.preventDefault();
    const messageText = event.target.messageField.value;
    socket?.emit("message", { messageText });

    event.target.messageField.value = "";
  };

  useEffect(() => {
    document.querySelector(".chat__messages").scrollTop =
      document.querySelector(".chat__messages").scrollHeight;

    socket = SocketIOClient(serverLinkUrl, { transports: ["websocket"] });

    socket.on("message", (data) => {
      setMessages((prevState) => [
        ...prevState,
        <Message from={user?.username} message={data?.messageText} />,
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    document.querySelector(".chat__messages").scrollTop =
      document.querySelector(".chat__messages").scrollHeight;
  });
  return (
    <div className="chat">
      <div className="chat__main">
        <div className="chat__messages">{messages}</div>
        <div className="chat__form">
          <form onSubmit={handler}>
            <input
              required
              name="messageField"
              placeholder="Enter message to submit"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
