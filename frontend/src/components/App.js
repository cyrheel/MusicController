import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>
        Testing React in Django wtf is this it's so cool and hard as the same
        time
      </h1>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
