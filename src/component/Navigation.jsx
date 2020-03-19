import React, { Component } from "react";
import logo from "../../public/logo.png";
import "../styles/Navigation.css";

class Navigation extends Component {
  render() {
    // Variable checked used to change the switch to the correct mode when a scan occurs, 
    // because input type="checkbox" has an attribute of 'checked' or not === true or false
    var checked =
      this.props.mode === 0
        ? true
        : false; 

    return (
      <nav className="App-top">
        <img src={logo} alt="RBuddie Logo" className="App-logo" />
        <div className="App-top-switch">
          <div>Scan</div>
          <label className="switch">
            <input
              type="checkbox"
              onChange={this.props.toggleMode}
              checked={checked}
            />
            <span className="slider round" />
          </label>
          <div>Receipts</div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
