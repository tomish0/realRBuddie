import React, { Component } from "react";
import QrReader from "react-qr-reader";
import "./styles/App.css";
import ShowAllReceipts from "./component/ShowAllReceipts";
import Navigation from "./component/Navigation";
import NotificationBar from "./component/NotificationBar";

class App extends Component {
  state = {
    receiptsData: [],
    filteredData: [],
    filteredDataError: true,
    latestScan: null,
    isDuplicate: false,
    isError: false,
    mode: 1
  };
  render() {
    return (
      <div className="App">
        <Navigation toggleMode={this.toggleMode} mode={this.state.mode} />

        {this.state.mode ? (
          <div>
            <NotificationBar
              isError={this.state.isError}
              isDuplicate={this.state.isDuplicate}
            />
            <QrReader
              style={{ width: "100%" }}
              onScan={this.onScan}
              onError={this.onError}
              delay={300}
              facingMode="user"
            />
          </div>
        ) : (
          <ShowAllReceipts
            receiptsData={
              this.state.filteredData.length > 0
                ? this.state.filteredData
                : this.state.receiptsData
            }
            filter={this.filter}
          />
        )}
      </div>
    );
  }

  onScan = dataString => {
    if (dataString) {
      var scannedDataObj = JSON.parse(dataString);
      // Check the parsed data is a valid object & a Rbuddie reciept
      if (scannedDataObj !== null && scannedDataObj.app === "Rbuddie") {
        if (
          // Check to see if receipt is already stored in receiptsData - a duplicate
          this.state.receiptsData.some(
            receipt => receipt.id === scannedDataObj.id
          )
        ) {
          // If yes then show receipt but don't push duplicate into receiptsDate
          this.setState({
            latestScan: scannedDataObj,
            isDuplicate: true,
            isError: false
          });
        } else {
          // The receipt isn't a duplicate so you can then put receipt into receiptsData & show
          // Use spread operator to put receipt into array with other receipts, not replace
          let receiptsData = [...this.state.receiptsData];
          // Push valid receipt object into receiptsData array
          receiptsData.unshift(scannedDataObj);

          this.setState({
            receiptsData,
            latestScan: scannedDataObj,
            isDuplicate: false,
            isError: false,
            mode: 0
          });
        }
      } else {
        // Changing isError state to true to print "This is not an RBuddie code"
        this.setState({
          isError: true
        });
      }
    }
  };

  toggleMode = () => {
    this.setState({
      mode: this.state.mode === 0 ? 1 : 0,
      isError: false,
      isDuplicate: false
    });
  };

  filter = value => {
    // const reg = new RegExp(value, "g");
    const filteredData = this.state.receiptsData.filter(receipt => {
      return receipt.vendor === value;
    });
    this.setState({ filteredData: filteredData, filteredDataError: false})

    console.log("Filtered", filteredData);
    console.log(this.state);
  };

  onError = error => {
    console.log(error);
  };
}

export default App;
