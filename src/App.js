import React, { Component } from "react";
import ShowReceipt from './component/ShowReceipt'
import "./App.css";
import QrReader from "react-qr-reader";

class App extends Component {
  state = {
    receiptData: {},
    isDuplicate: false,
    isError: false,
    renderReceipt: false
  };
  render() {
    console.log(this.state.receiptData);
    return (
      <div className="App">
        <h1>Scan Your Receipt</h1>
        <QrReader style={{ width: "100%" }} onScan={this.onScan} onError={this.onError} delay={300} facingMode="user" />
        <div>{this.state.isError ? "This is not an RBuddie code" : ""}</div>
        {this.state.renderReceipt ? <ShowReceipt receipt={this.state.receiptData} isDuplicate={this.state.isDuplicate} /> : ''}
      </div>
    );
  }

  onScan = dataString => {
    if (dataString) {
      var scannedDataObj = JSON.parse(dataString);
      // Check the parsed data is a valid object & a Rbuddie reciept
      if (scannedDataObj !== null && scannedDataObj.app === "Rbuddie") {

        // Check if the receipt has already been saved
        const receipt = this.receiptExists(scannedDataObj.authorisationCode);

        if (receipt) {
          this.setState({ receiptData: receipt, isDuplicate: true, isError: false, renderReceipt: true })
        } else {
          this.setState({ receiptData: scannedDataObj, isDuplicate: false, isError: false, renderReceipt: true });
          const stringReceiptId = JSON.stringify(scannedDataObj.authorisationCode);
          const stringReceipt = JSON.stringify(scannedDataObj);
          // Persist the new Receipt to the local storage
          localStorage.setItem(stringReceiptId, stringReceipt);
        }
      } else {
        this.setState({ isError: true, renderReceipt: false });
      }
    }
  };

  onError = (error) => {
    console.log(error);
  }

  receiptExists = (receiptId) => {
    const storedReceipt = localStorage.getItem(receiptId);
    const storedReceiptObj = JSON.parse(storedReceipt);
    if (storedReceiptObj) return storedReceiptObj;
    else return false;
  }
}

export default App;
