import React, { Component } from "react";
import QrReader from "react-qr-reader";
import ShowReceipt from './component/ShowReceipt';
import Button from './component/Button';
import "./styles/App.css";
import logo from '../public/logo.png'

class App extends Component {
  state = {
    receiptData: {},
    isDuplicate: false,
    isError: false,
    renderReceipt: false,
    shouldScan: true
  };
  render() {
    console.log(this.state.receiptData);
    return (
      <div className="App">
        <div className="App-top">
          <img src={logo} alt="RBuddie Logo" className="App-logo" />

        </div>
        {this.state.shouldScan ? <QrReader style={{ width: "100%" }} onScan={this.onScan} onError={this.onError} delay={300} facingMode="user" /> : <Button toggleQrReader={this.toggleReader} />}
        <div>{this.state.isError ? "This is not an RBuddie code" : ""}</div>
        {this.state.renderReceipt ? <ShowReceipt receipt={this.state.receiptData} isDuplicate={this.state.isDuplicate} /> : ''}
        <header className="App-header">
        </header>
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
          this.setState({ receiptData: receipt, isDuplicate: true, isError: false, renderReceipt: true, shouldScan: false })
        } else {
          this.setState({ receiptData: scannedDataObj, isDuplicate: false, isError: false, renderReceipt: true, shouldScan: false });
          const stringReceiptId = JSON.stringify(scannedDataObj.authorisationCode);
          const stringReceipt = JSON.stringify(scannedDataObj);
          // Persist the new Receipt to the local storage
          localStorage.setItem(stringReceiptId, stringReceipt);
        }
      } else {
        this.setState({ isError: true, renderReceipt: false, shouldScan: true });
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

  toggleReader = () => {
    this.setState({ shouldScan: true, renderReceipt: false })
  }
}

export default App;
