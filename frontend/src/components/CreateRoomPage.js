import React, { Component } from "react";
import styles from "/static/CSS/CreateRoomPage.module.css";

class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      errorMsg: "",
      successMsg: "",
      updateStatus: null,
    };
    this.getCookie = this.getCookie.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleCreateRoomPressed = this.handleCreateRoomPressed.bind(this);
    this.handleUpdateRoomPressed = this.handleUpdateRoomPressed.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderCreateButtons = this.renderCreateButtons.bind(this);
    this.renderUpdateButtons = this.renderUpdateButtons.bind(this);
    this.renderPopUp = this.renderPopUp.bind(this);
  }

  getCookie(name) {
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
    let csrftoken = this.getCookie("csrftoken");

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
        let roomPath = "/room/" + data.code;
        window.location.href = roomPath;
      });
  }

  handleUpdateRoomPressed() {
    let csrftoken = this.getCookie("csrftoken");
    let curr_url = window.location.href;
    let to_remove = "/room/" + this.props.roomCode;
    let url_for_fetch = curr_url.replace(to_remove, "/api/update-room");

    const requestOptions = {
      method: "PATCH",
      headers: {
        Accepte: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };

    fetch(url_for_fetch, requestOptions)
      .then((response) => {
        if (response.ok) {
          this.setState({
            successMsg: "Room updated successfully !",
            updateStatus: true,
          });
          // alert("Room updated successfully !");
        } else {
          this.setState({
            errorMsg: "Error while updating room :/",
            updateStatus: false,
          });
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          guestCanPause: data.guest_can_pause,
          votesToSkip: data.votes_to_skip,
        });
      });
  }

  renderHeader() {
    return (
      <div>
        <a href="/">
          <img
            src="static/images/arrow-left-circle-fill.svg"
            alt="back-icon"
            className={styles.backBtn}
          ></img>
        </a>
      </div>
    );
  }

  renderCreateButtons() {
    return (
      <button
        className={styles.createBtn}
        onClick={this.handleCreateRoomPressed}
      >
        Create Room
      </button>
    );
  }

  renderUpdateButtons() {
    return (
      <button
        className={styles.createBtn}
        onClick={this.handleUpdateRoomPressed}
      >
        Update Room !
      </button>
    );
  }

  renderPopUp(status) {
    if (status) {
      return (
        <div className={styles.popUp}>
          <p>{this.state.successMsg}</p>
        </div>
      );
    }
    return (
      <div className={styles.popUp}>
        <p>{this.state.errorMsg}</p>
      </div>
    );
  }

  render() {
    const title = this.props.update ? "Update Room" : "Create a Room";
    return (
      <div className={styles.container}>
        {this.props.update ? null : this.renderHeader()}
        <div className={styles.body}>
          {this.state.updateStatus
            ? this.renderPopUp(true)
            : this.renderPopUp(false)}
          <h1 className={styles.h1}>{title}</h1>
          <div className={styles.choiceContainer}>
            <h2 className={styles.h2}>User Can Pause a Song</h2>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputContainer}>
                <label htmlFor="play-pause">Play/Pause</label>
                <input
                  type="radio"
                  id="play-pause"
                  name="gcp"
                  onChange={this.handleGuestCanPauseChange}
                  value="true"
                  defaultChecked={this.props.guestCanPause}
                ></input>
              </div>
              <hr className={styles.hr} />
              <div className={styles.inputContainer}>
                <label htmlFor="no-control">No Control</label>
                <input
                  type="radio"
                  id="no-control"
                  name="gcp"
                  onChange={this.handleGuestCanPauseChange}
                  value="false"
                  defaultChecked={!this.props.guestCanPause}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.choiceContainer}>
            <h2 className={styles.h2}>Votes Required to Skip Song</h2>
            <input
              type="number"
              id="vote-skip"
              min={1}
              value={this.state.votesToSkip}
              onChange={this.handleVotesChange}
            ></input>
          </div>
          <div className={styles.btnContainer}>
            {this.props.update
              ? this.renderUpdateButtons()
              : this.renderCreateButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRoomPage;
