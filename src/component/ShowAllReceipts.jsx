import React, { Component } from "react";
import ShowReceipt from "./ShowReceipt";
import FilterReceipts from "./FilterReceipts";

class ShowAllReceipts extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.receiptsData.length > 0 ? (
          <div> {/* adding the functionality of deleting receipts from show all receipts*/}
            <FilterReceipts filter={this.props.filter} filteredDataError={this.props.filteredDataError} />
            <button onClick={this.props.deleteAllReceipts}>
              Clear receipts
            </button>
          </div>
        ) : null}

        {this.props.receiptsData.length === 0 && "You have no receipts"}
        {this.props.receiptsData.map((receipt, index) => {
          {/* Itarate through all the receipts data and displays all receipts */ }
          return (
            <div key={index}>
              <ShowReceipt
                receipt={receipt}
                isDuplicate={false}
                deleteReceipt={this.props.deleteReceipt}
                index={index}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShowAllReceipts;
