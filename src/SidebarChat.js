import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import db from "./firebase"; // Adjusted import statement for Firebase
import { Link } from "react-router-dom";
// import { onSnapshot } from 'firebase/firestore';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(()=>{
    if(id){  db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>
      setMessages(snapshot.docs.map((doc)=>doc.data()))
      );
    }
  
  },[id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter room name");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
      <Avatar src={`https://api.dicebear.com/7.x/${seed}/svg`} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p>L{messages[0]?.message}</p>
      </div>
    </div>
    </Link>
    
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
