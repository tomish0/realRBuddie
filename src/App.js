import React, { Component } from "react";
import QrReader from "react-qr-reader";
import "./styles/App.css";
import "./styles/QRReader.css";
import ShowAllReceipts from "./component/ShowAllReceipts";
import Navigation from "./component/Navigation";
import NotificationBar from "./component/NotificationBar";
import ExpiringModal from "./component/ExpiringReceiptsModal";

class App extends Component {
  state = {
    receiptsData: [], //contains all receipts in an Array.
    filteredData: [], //Array with receipts after this has been filtered.
    filteredValue: "",
    expiringReceipts: [],
    displayModal: false,
    filteredDataError: false, //when filtered data has no matching receipts.
    latestScan: null,
    isDuplicate: false, // Set to true when a receipt has been scanned already.
    isError: false, // Set to true when the receipt is not a RBuddie receipt.
    mode: 1 // When mode is 1, app is on scan mode; When 0, view receipt mode.
  };

  componentDidMount() {
    const receiptsData = JSON.parse(localStorage.getItem("receiptsData"));
    /* retreving receipt data from local storage, parsing from string to object and assigning to local variable */
    if (receiptsData !== null) {
      /* Evaluate if the receipts data is empty */
      const expiringReceipts = receiptsData.filter(
        receipt =>
          this.dateToTime(receipt.purchaseDate) < 8 &&
          this.dateToTime(receipt.purchaseDate) >= 0
      );
      /* Check if there are expiring receipts */
      this.setState({ receiptsData });
      /* updates state with receipt data */
      expiringReceipts.length !== 0
        ? this.setState({ expiringReceipts, displayModal: true })
        : null;
      // if there are expiring receipts then show the display modal in the receipts mode
    }
  }

  dateToTime = purchaseDate => {
    let currentDate = new Date();
    let receiptDate = new Date(purchaseDate);
    let difference = currentDate.getTime() - receiptDate.getTime();
    let days = Math.round(difference / 1000 / 60 / 60 / 24);
    return 28 - days;
  };

  deleteAllReceipts = () => {
    this.setState({ receiptsData: [], filteredData: [], displayModal: false });
    /* when this function is called sets the state Empty */
    localStorage.setItem("receiptsData", null);
    /*Deleting all receipts from storage */
  };

  deleteReceipt = (receiptId, vendor) => {
    let receiptsData = [...this.state.receiptsData];
    const indexReceiptsData = receiptsData.findIndex(
      x => x.id === receiptId && x.vendor === vendor
    );
    receiptsData.splice(indexReceiptsData, 1);

    const indexExpiringReceipts = this.state.expiringReceipts.findIndex(
      x => x.id === receiptId && x.vendor === vendor
    );
    console.log(indexExpiringReceipts);
    indexExpiringReceipts >= 0
      ? this.state.expiringReceipts.splice(indexExpiringReceipts, 1)
      : null;
    if (this.state.expiringReceipts.length === 0) {
      this.setState({ displayModal: false });
    }
    /* Make copy of the receipts data and Delete */
    localStorage.setItem("receiptsData", JSON.stringify(receiptsData));
    /* update storage with new receipts data as string*/
    this.filter(this.state.filteredValue, receiptsData);
  };

  onScan = dataString => {
    if (dataString) {
      var scannedDataObj = JSON.parse(
        dataString
      ); /* if dataString is truthy, coverting data string to an object */
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
          // start a timer to reset isDuplicate
          setTimeout(() => this.setState({ isDuplicate: false }), 5000);
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
          this.filter("", this.state.receiptsData);
        }
      } else {
        // Changing isError state to true to print "This is not an RBuddie code"
        this.setState({
          isError: true
        });
        // start a timer to reset isError
        setTimeout(() => this.setState({ isError: false }), 5000);
      }
    }
  };
  // switches to opposite mode of the app
  toggleMode = () => {
    this.setState({
      mode: this.state.mode === 0 ? 1 : 0,
      isError: false,
      isDuplicate: false,
      filteredDataError: false,
      filteredData: []
    });
  };

  // filter method: Takes string as argument for filtering(e.g 'T or t' will return tesco receipt)
  filter = (value, receiptsData = this.state.receiptsData) => {
    const filteredData = receiptsData.filter(receipt => {
      return (
        receipt.vendor.toLowerCase().includes(value.toLowerCase()) ||
        receipt.storeLocation.postcode.toLowerCase().replace(/\s/g, "") ==
          value.toLowerCase().replace(/\s/g, "") ||
        receipt.totalPrice == value
      ); // filter receipts changed to make non case sensitive
    });
    // Evaluate if filter returns any receipts and update state.
    const filteredDataError = filteredData.length > 0 ? false : true;

    this.setState({
      filteredData,
      filteredDataError,
      filteredValue: value,
      receiptsData
    });
  };

  closeModal = () => {
    this.setState({ displayModal: false });
  };

  onError = error => {
    console.log(error);
  };

  render() {
    // console.log(this.state.receiptsData)
    return (
      <div className="App">
        {/*Create navigation; toggle mode function sent down into Navigation Component as prop to change the Mode; Mode sent down as prop to set state of slider*/}
        <div className="navigation">
          <Navigation toggleMode={this.toggleMode} mode={this.state.mode} />
        </div>
        <div className="main">
          {this.state.mode ? (
            <div className="main-scan">
              <NotificationBar
                isError={this.state.isError}
                isDuplicate={this.state.isDuplicate}
                /*send down error as prop */
              />
              <div className="qr-reader">
                <QrReader
                  onScan={this.onScan}
                  onError={this.onError}
                  delay={200}
                  // facingMode="user"
                />
              </div>
              {/*Sending down width style; Send down onScan function for when there is a scan; 
            Delay: Set intervals between scans (milliseconds)*/}
            </div>
          ) : (
            <div
              className={
                this.state.displayModal
                  ? "main-receipts"
                  : "main-receipts expiring-receipts-modal-show"
              }
            >
              <ExpiringModal
                display={this.state.displayModal}
                expiringReceipts={this.state.expiringReceipts}
                func={this.closeModal}
              />

              <ShowAllReceipts
                receiptsData={
                  this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.receiptsData
                }
                /* Create show all receipts sending */
                filter={this.filter}
                filteredDataError={this.state.filteredDataError}
                deleteAllReceipts={this.deleteAllReceipts}
                deleteReceipt={this.deleteReceipt}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
