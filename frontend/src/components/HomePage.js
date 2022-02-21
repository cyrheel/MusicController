import React, { Component } from "react";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <h1>Music Controller</h1>
        <div className="btn-container">
          <a className="btn" href="/create">
            Create Room
          </a>
          <a className="btn" href="/join">
            Join Room
          </a>
        </div>
      </div>
    );
  }
}

export default HomePage;
