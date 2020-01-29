import React, { Component } from "react";
import QrReader from "react-qr-reader";
import ShowReceipt from './component/ShowReceipt';
import Button from './component/Button';
import "./styles/App.css";
import logo from '../public/logo.png'

class App extends Component {
  state = {
    receiptsData: [],
    latestScan: null,
    isDuplicate: false,
    isError: false,
    shouldScan: true
  };
  render() {
    console.log(this.state.receiptsData);
    return (
      <div className="App">
        <div className="App-top">
          <img src={logo} alt="RBuddie Logo" className="App-logo" />

        </div>
        {this.state.shouldScan ? <QrReader style={{ width: "100%" }} onScan={this.onScan} onError={this.onError} delay={300} facingMode="user" /> : <Button toggleQrReader={this.toggleReader} />}
        <div>{this.state.isError ? "This is not an RBuddie code" : ""}</div>
        {this.state.latestScan ? <ShowReceipt receipt={this.state.latestScan} isDuplicate={this.state.isDuplicate} /> : ''}
        <header className="App-header">
        </header>
      </div>
    );
  }

  onScan = dataString => {
    console.log(dataString);
    if (dataString) {
      var scannedDataObj = JSON.parse(dataString);
      // Check the parsed data is a valid object & a Rbuddie reciept
      if (scannedDataObj !== null && scannedDataObj.app === "Rbuddie") {

        if (this.state.receiptsData.some(receipt => receipt.id === scannedDataObj.id)) {
          this.setState({ isDuplicate: true, isError: false, renderReceipt: true, shouldScan: false })
        } else {
          let receiptsData = [...this.state.receiptsData];
          receiptsData.push(scannedDataObj);
          this.setState({ receiptsData, isDuplicate: false, isError: false, renderReceipt: true, shouldScan: false })
        }

      }
    }
  };

  onError = (error) => {
    console.log(error);
  }

  toggleReader = () => {
    this.setState({ shouldScan: true, renderReceipt: false })
  }
}

export default App;
