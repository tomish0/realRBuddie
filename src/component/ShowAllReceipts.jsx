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
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = e => {
    const scrollY = window.scrollY;
    if (scrollY > 400) {
      this.setState({ scroll: true });
    } else {
      return this.setState({ scroll: false });
    }
  };

  render() {
    return (
      <div onScroll={this.handleScroll}>
        <div className="show_filter">
          {this.props.receiptsData.length > 0 ? (
            <div>
              <FilterReceipts
                filter={this.props.filter}
                filteredDataError={this.props.filteredDataError}
              />
            </div>
          ) : null}
        </div>
        <div className="no-receipts">
          {this.props.receiptsData.length === 0 && "You have no receipts"}
        </div>

        {this.props.receiptsData.map((receipt, index) => {
          /* Itarate through all the receipts data and displays all receipts */

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
