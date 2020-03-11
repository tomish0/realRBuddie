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
    receiptsData: [], // Contains all receipts
    filteredData: [], // Receipts after they have been filtered.
    filteredValue: "", // Value received when filtering
    filteredDataError: false, // Error when filtered data has no matching receipts.
    expiringReceipts: [], // Receipts that are within 8 days of 'expiry'
    displayModal: false, // Show / not show the expiring receipts modal component
    isDuplicate: false, // Set to true when a receipt has already been scanned.
    isError: false, // Set to true when the receipt is not a RBuddie receipt.
    mode: 1 // When mode is 1, app is on scan mode; When 0, view receipt mode.
  };

  componentDidMount() {
    // Retrieve receipt data from local storage, parsing from string to object and assign to local variable
    // Evaluate if the receipts data is not empty
    // Filter receiptsData to find any receipts that are to expire in 8 days and assign to expiringReceipts
    // Update initial state of app with the receiptsData from the storage
    // If there are any expiringReceipts after the filter, then conditional returns true
    // The state is set with this array of expiringReceipts and
    // The displayModal is returned true so the component ExpiringReceiptsModal is shown in receipts mode
    const receiptsData = JSON.parse(localStorage.getItem("receiptsData"));
    if (receiptsData !== null) {
      const expiringReceipts = receiptsData.filter(
        receipt =>
          this.dateToTime(receipt.purchaseDate) < 8 &&
          this.dateToTime(receipt.purchaseDate) >= 0
      );
      this.setState({ receiptsData }); // eslint-disable-next-line
      expiringReceipts.length !== 0
        ? this.setState({ expiringReceipts, displayModal: true })
        : null;
    }
  }

  toggleMode = () => {
    // switches to opposite mode of the app
    this.setState({
      mode: this.state.mode === 0 ? 1 : 0,
      isError: false,
      isDuplicate: false,
      filteredDataError: false,
      filteredData: []
    });
  };

  onScan = dataString => {
    // if dataString is truthy, coverting data string to an object
    if (dataString) {
      var scannedDataObj = JSON.parse(dataString);
      // Check the parsed data is a valid object & a Rbuddie reciept
      if (scannedDataObj !== null && scannedDataObj.app === "Rbuddie") {
        // If yes, then check to see if receipt is already stored in receiptsData - a duplicate
        if (
          this.state.receiptsData.some(
            receipt => receipt.id === scannedDataObj.id
          )
        ) {
          // If yes, show duplicate message by setting isDuplicate to true
          // start a timer to reset isDuplicate & remove duplicate message
          this.setState({
            isDuplicate: true
          });
          setTimeout(() => this.setState({ isDuplicate: false }), 5000);
        }
        // The receipt isn't a duplicate so:
        // Use spread operator to be able to put receipt into array with other receipts, not replace
        // Push valid receipt object into receiptsData array to index 0 with unshift()
        // Set state with updated receipts & change mode to show receipts (mode: 0)
        // Add new receiptsData array to local storage
        // Send the filter func parameters of empty string = value &
        // the current receiptsData to avoid index issues when delete func calls the filter func
        else {
          let receiptsData = [...this.state.receiptsData];
          receiptsData.unshift(scannedDataObj);
          this.setState({
            receiptsData,
            mode: 0
          });
          localStorage.setItem("receiptsData", JSON.stringify(receiptsData));
          this.filter("", this.state.receiptsData);
        }
      }
      // The receipt isn't an RBuddie receipt so isError state = true to print error message
      // start a timer to reset isError & remove error message
      else {
        this.setState({
          isError: true
        });
        setTimeout(() => this.setState({ isError: false }), 5000);
      }
    }
  };

  deleteReceipt = (receiptId, vendor) => {
    // Use spread operator to get latest version of receiptsData from the state
    // Find the correct index of receipt in the receiptsData array using ID & vendor
    // Using index from map won't work as asynchronous and will delete wrong receipt
    // Use splice() to remove the receipt from the array receiptsData
    // Set local storage with deleted receipt from array
    let receiptsData = [...this.state.receiptsData];
    const indexReceiptsData = receiptsData.findIndex(
      x => x.id === receiptId && x.vendor === vendor
    );
    receiptsData.splice(indexReceiptsData, 1);
    localStorage.setItem("receiptsData", JSON.stringify(receiptsData));
    // Use findIndex() again to find correct receipts in expiringReceipts array
    // Conditional to check if the index is greater / equal to 0 because
    // when deleteReceipt func is called it finds an index of whichever receipt you delete,
    // including those not in expiringReceipts, giving them an index of -1
    // If true (meaning receipt is in array, not returning -1), splice from array
    // Check if no expiring receipts after delete, to remove ExpiringReceiptsModal
    const indexExpiringReceipts = this.state.expiringReceipts.findIndex(
      x => x.id === receiptId && x.vendor === vendor
    ); // eslint-disable-next-line
    indexExpiringReceipts >= 0
      ? this.state.expiringReceipts.splice(indexExpiringReceipts, 1)
      : null;
    if (this.state.expiringReceipts.length === 0) {
      this.setState({ displayModal: false });
    }
    // When func is called, send the filter function the parameters of
    // the current filteredValue & receiptsData
    // Avoids issues of asynchonicity when deleting receipts during filtering
    this.filter(this.state.filteredValue, receiptsData);
  };

  deleteAllReceipts = () => {
    // When func is called, set arrays in state to empty and close expiringReceiptsModal comp
    // Delete receipts from local storage
    this.setState({ receiptsData: [], filteredData: [], displayModal: false });
    localStorage.setItem("receiptsData", null);
  };

  filter = (value, receiptsData = this.state.receiptsData) => {
    // Filter func takes two arguments:
    // 1) value = string typed into filter
    // 2) current receiptsData from delete/onScan funcs with a default of the current state.receiptsData
    // Filter receiptsData so that for each receipt you are searching for matches to the following:
    // 1) Vendor - case insensitive & .includes() used so doesn't have to exact for success
    // 2) Postcode - case insensitive, ignores space, but has to be exact for success
    // 3) Total Price - number is exact match to total price for success
    // If there is no success from filtering, filteredDataError given true in state & message is shown
    // Else there is success and state is set as follows
    const filteredData = receiptsData.filter(receipt => {
      return (
        receipt.vendor.toLowerCase().includes(value.toLowerCase()) || // eslint-disable-next-line
        receipt.storeLocation.postcode.toLowerCase().replace(/\s/g, "") ==
          value.toLowerCase().replace(/\s/g, "") || // eslint-disable-next-line
        receipt.totalPrice == value
      );
    });
    const filteredDataError = filteredData.length > 0 ? false : true;
    this.setState({
      filteredData,
      filteredDataError,
      filteredValue: value,
      receiptsData
    });
  };

  dateToTime = purchaseDate => {
    // Create variable currentDate
    // Create variable receiptDate - a date created with the purchaseDate key of the receipt json
    // Variable difference calculates difference in time (milliseconds) between two dates
    // Variable days changes time in milliseconds to days
    // Return 28 - the days to be used to find out the time to expiry on each receipt
    let currentDate = new Date();
    let receiptDate = new Date(purchaseDate);
    let difference = currentDate.getTime() - receiptDate.getTime();
    let days = Math.round(difference / 1000 / 60 / 60 / 24);
    return 28 - days;
  };

  closeModal = () => {
    // Func called upon clicking button in expiringReceiptsModal to hide component
    this.setState({ displayModal: false });
  };

  onError = error => {
    // Used to remove warning in console - related to QrReader package
    console.log(error);
  };

  render() {
    return (
      <div className="App">
        <div className="navigation">
          {/* toggleMode func sent into Navigation to change the mode; 
          mode sent to set state of slider */}
          <Navigation toggleMode={this.toggleMode} mode={this.state.mode} />
        </div>
        <div className="main">
          {/* Conditional: if mode is truthy (= current state) = 1 then return the scan page;
          else return receipts page */}
          {this.state.mode ? (
            <div className="main-scan">
              {/* isError & isDuplicate states sent into NotificationBar to show associate messages */}
              <NotificationBar
                isError={this.state.isError}
                isDuplicate={this.state.isDuplicate}
              />
              <div className="qr-reader">
                {/* QrReader comp obtained from QrReader react package;
                onScan func called when there is a scan;
                onError used simply to avoid error message in console;
                delay sets interval between scans (milliseconds) */}
                <QrReader
                  onScan={this.onScan}
                  onError={this.onError}
                  delay={200}
                />
              </div>
            </div>
          ) : (
            <div className="main-receipts">
              {/* ExpiringModal sent display to show / hide component;
              expiringReceipts - array with the expiring receipts;
              func to close the component with click */}
              <ExpiringModal
                displayModal={this.state.displayModal}
                expiringReceipts={this.state.expiringReceipts}
                closeModal={this.closeModal}
              />
              {/* ShowAllReceipts sent receiptsData which is contingent on a filter:
              if filter returns success then filteredData is shown, else receiptsData shown;
              filter func & filteredDataError sent to send down to FilterReceipts comp;
              deleteAllReceipts & deleteReceipt funcs sent to be called upon onClick */}
              <ShowAllReceipts
                receiptsData={
                  this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.receiptsData
                }
                filter={this.filter}
                filteredDataError={this.state.filteredDataError}
                deleteReceipt={this.deleteReceipt}
                deleteAllReceipts={this.deleteAllReceipts}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
