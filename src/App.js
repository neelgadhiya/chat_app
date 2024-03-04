import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider"; // Importing useStateValue from StateProvider without specifying the file extension

import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [{ user }, dispatch] = useStateValue(); // Destructuring user and dispatch from the state
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
