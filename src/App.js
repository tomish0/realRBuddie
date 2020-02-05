import React, { Component } from "react";
import QrReader from "react-qr-reader";
import ShowReceipt from "./component/ShowReceipt";
import "./App.css";
import logo from "../public/logo.png";
import ButtonShowAllReceipts from "./component/ButtonShowAllReceipts";
import ShowAllReceipts from "./component/ShowAllReceipts";

class App extends Component {
  state = {
    receiptsData: [],
    showAllReceipts: false,
    latestScan: null,
    isDuplicate: false,
    isError: false
  };
  render() {
    console.log(this.state);

    return (
      <div className="App">
        <div className="App-top">
          <img src={logo} alt="RBuddie Logo" className="App-logo" />
        </div>
        <ButtonShowAllReceipts showAllReceipts={this.showAllReceipts} />
        {this.state.showAllReceipts ? (
          <ShowAllReceipts receiptsData={this.state.receiptsData} />
        ) : this.state.latestScan === null ? (
          <QrReader
            style={{ width: "100%" }}
            onScan={this.onScan}
            onError={this.onError}
            delay={300}
            facingMode="user"
          />
        ) : (
          <ShowReceipt
            receipt={this.state.latestScan}
            isDuplicate={this.state.isDuplicate}
            toggleQrReader={this.toggleReader}
          />
        )}
        <div>{this.state.isError ? "This is not an RBuddie code" : ""}</div>
        <header className="App-header"></header>
      </div>
    );
  }

  onScan = dataString => {
    console.log(dataString);
    if (dataString) {
      var scannedDataObj = JSON.parse(dataString);
      // Check the parsed data is a valid object & a Rbuddie reciept
      if (scannedDataObj !== null && scannedDataObj.app === "Rbuddie") {
        if (
          this.state.receiptsData.some(
            receipt => receipt.id === scannedDataObj.id
          )
        ) {
          this.setState({
            latestScan: scannedDataObj,
            isDuplicate: true,
            isError: false,
            shouldScan: false
          });
        } else {
          let receiptsData = [...this.state.receiptsData];
          receiptsData.push(scannedDataObj);
          this.setState({
            receiptsData,
            latestScan: scannedDataObj,
            isDuplicate: false,
            isError: false,
            shouldScan: false
          });
        }
      }
    }
  };

  onError = error => {
    console.log(error);
  };

  toggleReader = () => {
    this.setState({ latestScan: null, renderReceipt: false });
    console.log("hello");
  };

  showAllReceipts = () => {
    this.setState({ showAllReceipts: !this.state.showAllReceipts });
  };
}

export default App;
