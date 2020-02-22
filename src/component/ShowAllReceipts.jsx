import React, { Component } from "react";
import ShowReceipt from "./ShowReceipt";
import FilterReceipts from "./FilterReceipts";
import "../styles/ShowAllReceipts.css";

class ShowAllReceipts extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="show_all_receipts_top">
          {this.props.receiptsData.length > 0 ? (
            <div>
              <FilterReceipts
                filter={this.props.filter}
                filteredDataError={this.props.filteredDataError}
              />
            </div>
          ) : null}
        </div>
       <div className="no-receipts">{this.props.receiptsData.length === 0 && "You have no receipts"}</div> 
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
        <div className="show_all_receipts_bottom">
          <button onClick={this.props.deleteAllReceipts}>
            Delete All Receipts
          </button>
        </div>
      </div>
    );
  }
}

export default ShowAllReceipts;
