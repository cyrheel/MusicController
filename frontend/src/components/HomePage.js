import React, { Component } from "react";
import styles from "/static/CSS/HomePage.module.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Music Controller</h1>
        <div className={styles.choiceContainer}>
          <a className={styles.btn} href="/create">
            Create Room
          </a>
          <a className={styles.btn} href="/join">
            Join Room
          </a>
        </div>
      </div>
    );
  }
}

export default HomePage;
