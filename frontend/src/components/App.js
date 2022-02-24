import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { render } from "react-dom";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />} />
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
