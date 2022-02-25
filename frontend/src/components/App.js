import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { render } from "react-dom";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";

function App(props) {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

  const RoomRedirect = () => {
    if (roomCode === null || roomCode === undefined) {
      return <HomePage />;
    }
    return <Navigate replace to={"/room/" + roomCode} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="" element={RoomRedirect()} />
        <Route path="join" element={<RoomJoinPage />} />
        <Route path="create" element={<CreateRoomPage />} />
        <Route path="room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}

const appDiv = document.getElementById("app");
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  appDiv
);
