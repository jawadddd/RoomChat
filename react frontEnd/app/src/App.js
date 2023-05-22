import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const App = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div>
      <div>
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Send Message:</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
