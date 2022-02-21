import React, { Component } from "react";

class CreateRoomPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="create-container">
        <div className="create-header">
          <a href="/">
            <img
              src="static/images/arrow-left-circle-fill.svg"
              alt="back-icon"
            ></img>
          </a>
        </div>
        <div className="create-body">
          <h1>This is the Create Room Page</h1>
        </div>
      </div>
    );
  }
}

export default CreateRoomPage;
