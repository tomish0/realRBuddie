import React, { Component } from "react";
import QrReader from "react-qr-reader";
import "./styles/App.css";
import ShowAllReceipts from "./component/ShowAllReceipts";
import Navigation from "./component/Navigation";

class App extends Component {
  state = {
    receiptsData: [],
    showAllReceipts: false,
    latestScan: null,
    isDuplicate: false,
    isError: false,
    mode: 1
  };
  render() {
    console.log(this.state);

    return (
      <div className="App">
        <Navigation toggleMode={this.toggleMode} mode={this.state.mode}/>

        {/* Statement with three if, else situations:
        1) If ButtonShowAllReceipts is clicked, this causes the showAllReceipts function to setState to true, 
        therefore showing all scanned receipts stored in receiptsData[] which is passed into ShowAllReceipts comp. 
        If not clicked, state property showAllReceipts remains false and next condition is evaluated.
        2) If there has been no receipt scanned then the state property latestScan remains null, 
        meaning the QrReader is shown. 
        If there is a rbuddie qr code shown, then the onScan function alters the state property latestScan to the scannedDataObj,
        which is passed into the ShowReceipt comp
        3) The ShowReceipt comp shows the scanned receipt*/}
        {this.state.mode ? (
          <QrReader
            style={{ width: "100%" }}
            onScan={this.onScan}
            onError={this.onError}
            delay={300}
            facingMode="user"
          />
        ) : (
          <ShowAllReceipts receiptsData={this.state.receiptsData} />
        )}
        <div>{this.state.isError ? "This is not an RBuddie code" : null}</div>
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
          receiptsData.push(scannedDataObj);
          
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

  toggleMode = () => {
    this.setState({ mode: this.state.mode === 0 ? 1 : 0 });
  };
}

export default App;
