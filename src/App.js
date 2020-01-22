import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import QrReader from "react-qr-reader";

class App extends Component {
  state = {
    data: [{ vendor: "Londis" }],
    isError: false
  };
  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <div>Result: {this.state.data.map(receipt=>{
          return receipt.vendor ;
        })}</div>
        <div>{this.state.isError ? "This is not an RBuddie code" : ""}</div>
        <QrReader style={{ width: "100%" }} onScan={this.onScan} delay={300} />
      </div>
    );
  }

  onScan = event => {
    if (event) {
      var obj = JSON.parse(event);
      if (obj !== null && obj.app === "Rbuddie") {
        var newState = [...this.state.data];
        console.log(newState);
        newState.push(obj);
        // newState.isError=false
        this.setState({ data: newState, isError: false });
        console.log(obj);
      } else {
        this.setState({ isError: true });
      }
    }
  };
}

export default App;
