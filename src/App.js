import React, { Component } from "react";
import QrReader from "react-qr-reader";
import ShowReceipt from "./component/ShowReceipt";
import Button from "./component/Button";
import "./App.css";
import logo from "../public/logo.png";

const reciptTest = {
  id: "12ddasd343234s",
  totalPrice: 400,
  purchaseDate: "2020-01-20",
  purchaseTime: "23:59:59",
  items: [
    {
      title: "BATTERED SAUSAGE",
      price: 100,
      returnPeriod: 28
    },
    {
      title: "BATTERED MELON",
      price: 300,
      returnPeriod: 28
    }
  ],
  vatValue: 80,
  vatNumber: 262897,
  authorisationCode: 12345,
  vendor: "Tesco",
  storeName: "Scunthorpe Superstore",
  storePhoneNo: "020 8753 8888",
  storeLocation: {
    company: "Tesco Supermarkets Ltd",
    road: "42 Doncaster Road",
    town: "Scunthorpe",
    postcode: "DN15 8GR"
  },
  app: "Rbuddie",
  tenderType: "VISA",
  amountTendered: 400,
  change: 0
};

class App extends Component { 
  state = {
    receiptsData: [],
    latestScan: reciptTest,
    isDuplicate: false,
    isError: false
  };
  render() {
    console.log(this.state.receiptsData);
    return (
      <div className="App">
        <div className="App-top">
          <img src={logo} alt="RBuddie Logo" className="App-logo" />
        </div>
        <Button toggleQrReader={this.toggleReader} />
        {this.state.latestScan === null ? (
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
  };
}

export default App;
