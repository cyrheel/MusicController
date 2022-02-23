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
          <h1>Create a Room</h1>
          <div className="guest-can-pause">
            <h2>Guest Control of Payback State</h2>
            <div className="form-can-pause">
              <div className="choice-container">
                <label htmlFor="play-pause">Play/Pause</label>
                <input
                  type="radio"
                  id="play-pause"
                  name="gcp"
                  className="input-gcp"
                ></input>
              </div>
              <div className="choice-container">
                <label htmlFor="no-control">No Control</label>
                <input
                  type="radio"
                  id="no-control"
                  name="gcp"
                  className="input-gcp"
                ></input>
              </div>
            </div>
          </div>
          <div className="votes-to-skip">
            <h2>Votes Required to Skip Song</h2>
            <input type="number" id="vote-skip" min={1} placeholder={1}></input>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRoomPage;
