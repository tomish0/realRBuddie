import React, { Component } from "react";
import logo from "../../public/logo.png";
import "../styles/Navigation.css";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <nav className="App-top">
        <img src={logo} alt="RBuddie Logo" className="App-logo" />
        <label className="switch">
          <input
            type="checkbox"
            onChange={this.props.toggleMode}
            {this.props.mode === 1 ? 'defaultChecked' : null}
          />
          <span className="slider round" />
        </label>
      </nav>
    );
  }
}

export default Navigation;
