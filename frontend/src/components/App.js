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

/*
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Routess">
        
      </div>
    );
  }
}
*/

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="join" element={<RoomJoinPage />} />
        <Route path="create" element={<CreateRoomPage />} />
      </Routes>
    </Router>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
