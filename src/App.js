import React, { Component } from "react";
import QrReader from "react-qr-reader";
import "./styles/App.css";
import ShowAllReceipts from "./component/ShowAllReceipts";
import Navigation from "./component/Navigation";
import NotificationBar from "./component/NotificationBar";

class App extends Component {
  state = {
    receiptsData: [], //contains all receipts in an Array.
    filteredData: [], //Array with receipts after this has been filtered.
    filteredDataError: false, //when filtered data has no matching receipts.
    latestScan: null,
    isDuplicate: false,// Set to true when a receipt has been scanned already.
    isError: false, // Set to true when the receipt is not a RBuddie receipt.
    mode: 1 // When mode is 1, app is on scan mode; When 0, view receipt mode.
  };

  componentDidMount() {
    const receiptsData = JSON.parse(localStorage.getItem("receiptsData")); {/* retreving receipt data from local storage, parsing from string to object and assigning to local variable */ }

    if (receiptsData !== null) {
      {/* Evaluate if the receipts data is empty */ }
      this.setState({ receiptsData }); {/* updates state with receipt data */ }
    }
  }

  deleteAllReceipts = () => {
    this.setState({ receiptsData: [] }); {/* when this function is called sets the state Empty */ }
    localStorage.setItem("receiptsData", null); {/*Deleting all receipts from storage */ }
  };

  deleteReceipt = receiptID => {
    let receiptsData = [...this.state.receiptsData];
    receiptsData.splice(receiptID, 1); {/* Make copy of the receipts data and Delete */ }
    this.setState({ receiptsData });
    localStorage.setItem("receiptsData", JSON.stringify(receiptsData)); {/* update storage with new receipts data as string*/ }
  };

  onScan = dataString => {
    if (dataString) {
      var scannedDataObj = JSON.parse(dataString); /* if dataString is truthy, coverting data string to an object */
      // Check the parsed data is a valid object & a Rbuddie reciept
      if (scannedDataObj !== null && scannedDataObj.app === "Rbuddie") {
        if (
          // Check to see if receipt is already stored in receiptsData - a duplicate
          this.state.receiptsData.some(
            receipt => receipt.id === scannedDataObj.id
          )
        ) {
          // If yes then show receipt but don't push duplicate into receiptsData
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

          localStorage.setItem("receiptsData", JSON.stringify(receiptsData));
        }
      } else {
        // Changing isError state to true to print "This is not an RBuddie code"
        this.setState({
          isError: true
        });
      }
    }
  };
  // switches to opposite mode of the app
  toggleMode = () => {
    this.setState({
      mode: this.state.mode === 0 ? 1 : 0,
      isError: false,
      isDuplicate: false,
      filteredDataError: false
    });
  };

  // filter method: Takes string as argument for filtering(e.g 'T or t' will return tesco receipt)
  filter = value => {
    const filteredData = this.state.receiptsData.filter(receipt => {
      return receipt.vendor.toLowerCase().includes(value.toLowerCase()); // filter receipts changed to make non case sensitive 
    });

    // Evaluate if filter returns any receipts and update state.
    const filteredDataError = filteredData.length > 0 ? false : true

    this.setState({ filteredData, filteredDataError });

    console.log("Filtered", filteredData);
    console.log(this.state);
  };

  onError = error => {
    console.log(error);
  };

  render() {
    return (
      <div className="App">

        <Navigation toggleMode={this.toggleMode} mode={this.state.mode} /> {/*Create navigation; toggle mode function sent down into Navigation Component as prop to change the Mode; Mode sent down as prop to set state of slider*/}

        <div className="main">
          {this.state.mode ? (
            <div>
              <NotificationBar
                isError={this.state.isError}
                isDuplicate={this.state.isDuplicate} {/*send down error as prop */}
              />
              <QrReader
                style={{ width: "100%" }}
                onScan={this.onScan}
                onError={this.onError}
                delay={300}
                facingMode="user"
              /> {/*Sending down width style; Send down onScan function for when there is a scan; 
            Delay: Set intervals between scans (milliseconds)*/}
            </div>
          ) : (
            <ShowAllReceipts
              receiptsData={
                this.state.filteredData.length > 0
                  ? this.state.filteredData
                  : this.state.receiptsData
              }

              filter={this.filter} {/* Create show all receipts sending */}

              filteredDataError={this.state.filteredDataError}
              deleteAllReceipts={this.deleteAllReceipts}
              deleteReceipt={this.deleteReceipt}
            />
          )}

        </div>

      </div>
    );
  }
}

export default App;
