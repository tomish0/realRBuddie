import React, { Component } from "react";
import logo from "../../public/logo.png";
import "../styles/Navigation.css";

class Navigation extends Component {
  state = {};
  render() {

    var checked = this.props.mode == 0 ? true : false; 

    return (
      <nav className="App-top">
        <img src={logo} alt="RBuddie Logo" className="App-logo" />
        <div>Scan</div>
        <label className="switch">
          <input
            type="checkbox"
            onChange={this.props.toggleMode}
            checked={checked}
          />
          <span className="slider round" />
        </label>
        <div>Your Receipts</div>
      </nav>
    );
  }
}

export default Navigation;
