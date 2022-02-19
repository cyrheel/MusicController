import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route exact path=""></Route>
          <Route exact path="/join" component={RoomJoinPage} />
          <Route exact path="/create" component={CreateRoomPage} />
        </Routes>
      </Router>
    );
  }
}

export default HomePage;
