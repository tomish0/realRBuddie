import React, { Component } from "react";
import ShowReceipt from "./ShowReceipt";
import FilterReceipts from "./FilterReceipts";
import "../styles/ShowAllReceipts.css";

class ShowAllReceipts extends Component {
  state = {
    scroll: false,
    deleteClick: false
  };

  componentDidMount() {
    // When component mounts it listens to scrolling on screen
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // Removes the listener so won't work in scan mode
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = e => {
    // Window.scrollY gives you a measure of number of pixels scrolled down page
    // When past 400 state is changed to true and deleteAllReceipts button is shown
    window.scrollY > 400
      ? this.setState({ scroll: true })
      : this.setState({ scroll: false });
  };

  render() {
    return (
      // onScroll is built in react method
      // If there are receipts then the filter is shown
      // If no receipts are stored then a 'no receipts' message is shown
      <div onScroll={this.handleScroll}>
        <div>
          {this.props.receiptsData.length > 0 ? (
            <div>
              <FilterReceipts
                filter={this.props.filter}
                filteredDataError={this.props.filteredDataError}
              />
            </div>
          ) : (
            <p className="no-receipts">You have no receipts</p>
          )}
        </div>
        {/* Iterate through all the receiptData to display all receipts  */}
        {this.props.receiptsData.map((receipt, index) => {
          return (
            <div key={index}>
              <ShowReceipt
                receipt={receipt}
                isDuplicate={false}
                deleteReceipt={this.props.deleteReceipt}
                receiptId={receipt.id}
                vendor={receipt.vendor}
              />
            </div>
          );
        })}
        {/* If scroll is true then add class to transition in the deleteAllReeceipts button.
        If there is more than one receipt */}
        <div
          className={
            this.state.scroll
              ? "delete-all-receipts delete-all-receipts-sticky"
              : "delete-all-receipts"
          }
        >
          {this.props.receiptsData.length > 1 &&
          this.state.deleteClick === false ? (
            <div>
              <button onClick={() => this.setState({ deleteClick: true })}>
                Delete All Receipts
              </button>
            </div>
          ) : null}
          {this.props.receiptsData.length > 1 &&
          this.state.deleteClick === true ? (
            <div>
              <button
                onClick={() => {
                  this.props.deleteAllReceipts();
                  this.setState({ deleteClick: false, scroll: false });
                }}
              >
                Sure?
              </button>
              <button onClick={() => this.setState({ deleteClick: false })}>
                Cancel
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ShowAllReceipts;
