import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import styles from "/static/CSS/Room.module.css";

function Room(props) {
  const roomCode = useParams().roomCode;
  const [roomExist, setRoomExist] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(1);
  const [guestCanPause, setguestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        if (data.Room_not_found) {
          setRoomExist(false);
        }
        setVotesToSkip(data.votes_to_skip);
        setguestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }, []);

  const updateShowSettings = (value) => {
    if (value) {
      setShowSettings(value);
    } else {
      setShowSettings(value);
      location.reload();
    }
  };

  const renderSettingsButton = () => {
    return (
      <button
        onClick={() => {
          updateShowSettings(true);
        }}
        className={styles.settingBtn}
      >
        Settings
      </button>
    );
  };

  const renderSettings = () => {
    return (
      <div className={styles.roomContainer}>
        <CreateRoomPage
          update={true}
          votesToSkip={votesToSkip}
          guestCanPause={guestCanPause}
          roomCode={roomCode}
          updateCallBack={() => {}}
        />
        <div className={styles.closeBtnContainer}>
          <button
            onClick={() => {
              updateShowSettings(false);
            }}
            className={styles.closeBtn}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const leaveButtonPressed = () => {
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
    };

    fetch("/api/leave-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const display404 = () => {
    leaveButtonPressed();
    return (
      <div>
        <h3>Room Not Found :/</h3>
        <a href="/">Back on Home Page</a>
      </div>
    );
  };

  const displayRoom = () => {
    if (showSettings) {
      return renderSettings();
    }
    return (
      <div className={styles.roomContainer}>
        <h1 className={styles.h1}>
          Room code : <span className={styles.span}>{roomCode}</span>
        </h1>
        <p className={styles.p}>Votes needed to skip a song: {votesToSkip}</p>
        {isHost ? renderSettingsButton() : null}
        <a href="/" onClick={leaveButtonPressed} className={styles.leaveBtn}>
          Leave Room
        </a>
      </div>
    );
  };

  return roomExist ? displayRoom() : display404();
}

export default Room;
