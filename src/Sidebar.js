import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db  from "./firebase"; // Assuming you have initialized Firebase elsewhere
import { onSnapshot, collection } from "firebase/firestore";
import "./Sidebar.css";
import { useStateValue } from './StateProvider';

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user},dispatch]=useStateValue();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='sidebar'>
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder='Search or start new chat' type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
