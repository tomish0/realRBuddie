import React, { Component } from "react";
import ShowReceipt from "./ShowReceipt";
import FilterReceipts from "./FilterReceipts";
import "../styles/ShowAllReceipts.css"

class ShowAllReceipts extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.receiptsData.length > 0 ? (
          <div className="show_all_receipts_top">
            <i class="fas fa-search"></i>
            <FilterReceipts filter={this.props.filter} filteredDataError={this.props.filteredDataError}/>
            <button onClick={this.props.deleteAllReceipts}>
              Delete All Receipts
            </button>
          </div>
        ) : null}

        {this.props.receiptsData.length === 0 && "You have no receipts"}
        {this.props.receiptsData.map((receipt, index) => {
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
