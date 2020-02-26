import React, { Component } from "react";
import "../styles/Notification.css";

class NotificationBar extends Component {
  state = {};
  render() {
    return (
      <div className="notification">
        {this.props.isError
          ? <div className="notification-isError">This is not an RBuddie receipt</div>
          : this.props.isDuplicate
          ? <div className="notification-isDuplicate">You already have this receipt!</div>
          : <div className="notification-scan">Ready to scan</div>}
      </div>
    );
  }
}

export default NotificationBar;
