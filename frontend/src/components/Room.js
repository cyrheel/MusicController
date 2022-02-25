import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Room(props) {
  const roomCode = useParams().roomCode;
  const [roomExist, setRoomExist] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(1);
  const [guestCanPause, setguestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

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

  const display404 = () => {
    return (
      <div>
        <h3>Room Not Found :/</h3>
        <button to="/">Back on Home Page</button>
      </div>
    );
  };

  const displayRoom = () => {
    return (
      <div>
        <h3>{roomCode}</h3>
        <p>Votes: {votesToSkip}</p>
        <p>guestCanPause: {guestCanPause}</p>
        <p>Host: {isHost}</p>
      </div>
    );
  };

  return roomExist ? displayRoom() : display404();
}

export default Room;
