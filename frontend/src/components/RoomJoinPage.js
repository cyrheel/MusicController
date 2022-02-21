import React, { Component } from "react";

class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="join-container">
        <div className="join-header">
          <a href="/">
            <img
              src="static/images/arrow-left-circle-fill.svg"
              alt="back-icon"
            ></img>
          </a>
        </div>
        <div className="join-body">
          <h1>This is the Join Room Page</h1>
        </div>
      </div>
    );
  }
}

export default RoomJoinPage;
