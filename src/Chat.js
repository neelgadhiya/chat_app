import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from '@mui/icons-material/Mic';
import { SearchOutlined } from "@mui/icons-material";
import AttachFile from "@mui/icons-material/AttachFile";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, serverTimestamp, collection, setDoc } from 'firebase/firestore';
import db from "./firebase"; // Assuming you have initialized Firebase elsewhere
import "./Chat.css";
// import firebase from "firebase/compat/app"; // Import compat for firebase
import { useStateValue } from "./StateProvider";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages,setMessages]=useState([]);
  const[{user}]=useStateValue();


  useEffect(() => {
    if (roomId) {
      const unsubscribeRoom = onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const unsubscribeMessages = onSnapshot(
        doc(db, "rooms", roomId, "messages"),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        }
      );

      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      };
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      try {
        const messageRef = collection(db, "messages");
        const roomMessageRef = collection(db, "rooms", roomId, "messages");

        await setDoc(messageRef, {
          message: input,
          timestamp: serverTimestamp(),
          roomId: roomId,
        });

        await setDoc(roomMessageRef, {
          messages: input,
          name: user.displayName,
          timestamp: serverTimestamp(),
        });

        setInput("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://api.dicebear.com/7.x/${seed}/svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>last seen{" "}
          {
            new Date(
              messages[messages.length-1]?.timestamp?.toDate()
            ).toUTCString()
          } </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message)=>(
          <p className={`chat_message ${message.name===user.displayName && "chat_receiver"}`}>
            <span className="chat_name">
              {message.name}
            </span>{message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
