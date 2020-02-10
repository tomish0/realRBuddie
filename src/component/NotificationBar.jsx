import React, { Component } from "react";

class NotificationBar extends Component {
  state = {};
  render() {
    return (
      <p>
        {this.props.isError
          ? "This is not an RBuddie code"
          : this.props.isDuplicate
          ? "You have already scanned this receipt"
          : "Ready to scan"}
      </p>
    );
  }
}

export default NotificationBar;
