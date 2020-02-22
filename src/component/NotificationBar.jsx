import React, { Component } from "react";
import "../styles/Notification.css";

class NotificationBar extends Component {
  state = {};
  render() {
    return (
      <p className="notification">
        {this.props.isError
          ? "This is not an RBuddie receipt"
          : this.props.isDuplicate
          ? "You already have this receipt!"
          : "Ready to scan"}
      </p>
    );
  }
}

export default NotificationBar;
