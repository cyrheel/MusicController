import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Room(props) {
  const roomCode = useParams().roomCode;
  const [votesToSkip, setVotesToSkip] = useState(1);
  const [guestCanPause, setguestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVotesToSkip(data.votes_to_skip);
        setguestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }, []);

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>guestCanPause: {guestCanPause}</p>
      <p>Host: {isHost}</p>
    </div>
  );
}

export default Room;
