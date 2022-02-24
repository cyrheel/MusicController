import React, { Component } from "react";

class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleCreateRoomPressed = this.handleCreateRoomPressed.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleCreateRoomPressed() {
    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          let cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }

    let csrftoken = getCookie("csrftoken");

    const requestOptions = {
      method: "POST",
      headers: {
        Accepte: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };

    fetch("api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "/room/" + data.code;
      });
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
                  onChange={this.handleGuestCanPauseChange}
                  value="true"
                ></input>
              </div>
              <div className="choice-container">
                <label htmlFor="no-control">No Control</label>
                <input
                  type="radio"
                  id="no-control"
                  name="gcp"
                  className="input-gcp"
                  onChange={this.handleGuestCanPauseChange}
                  value="false"
                ></input>
              </div>
            </div>
          </div>
          <div className="votes-to-skip">
            <h2>Votes Required to Skip Song</h2>
            <input
              type="number"
              id="vote-skip"
              min={1}
              value={this.state.votesToSkip}
              onChange={this.handleVotesChange}
            ></input>
          </div>
          <div className="send-form-container">
            <button onClick={this.handleCreateRoomPressed}>
              Create Room !
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRoomPage;
