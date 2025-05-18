"use client";
import React, { useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

function Chat() {
  type Message = {
    message: string;
    sender: string;
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");

  const socketRef = useRef<Socket | null>(null);

  const sendMessage = () => {
    if (message.length > 0 && socketRef.current?.connected && username) {
      socketRef.current.emit("message", {
        message,
        sender: username,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = sessionStorage.getItem("username");
      if (storedUsername) setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL as string);

    socketRef.current.on("connect", () => {
      console.log("Connected to server");
    });

    socketRef.current.on("message-response", (data: { data: Message }) => {
      setMessages((prev) => [...prev, data.data]);

      const chatContainer = document.getElementById("chat-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col items-center justify-center w-[75%]">
      <div className="flex items-center justify-center w-full mb-16">
        <h1 className="text-3xl font-bold text-gray-300">Chat</h1>
      </div>
      <div className="w-full border-2 border-gray-300 rounded-md mb-2">
        {/* Messages Container */}
        <div
          id="chat-container"
          className="flex flex-col w-full h-96 overflow-y-auto p-2 space-y-2"
        >
          {messages.map((msg, index) => {
            const isAdmin = msg.sender === username;
            return (
              <div
                key={index}
                className={`flex ${
                  isAdmin ? "flex-row-reverse" : "flex-row"
                } items-start`}
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div
                  className={`${
                    isAdmin ? "mr-2" : "ml-2"
                  } max-w-xs md:max-w-md lg:max-w-lg`}
                >
                  <p className="text-gray-400 text-xs mb-1">{msg.sender}</p>
                  <p className="bg-gray-300 text-black p-2 rounded-md break-words">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div
          onKeyDown={handleKeyDown}
          className="flex items-center border-t border-gray-300 p-2 gap-2"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:gray-400"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 cursor-pointer transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
