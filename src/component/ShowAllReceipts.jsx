import React, { Component } from "react";
import ShowReceipt from "./ShowReceipt";
import FilterReceipts from "./FilterReceipts";
import "../styles/ShowAllReceipts.css";

class ShowAllReceipts extends Component {
  state = {};
  render() {
    return (
      <div>

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
       <div className="no-receipts">{this.props.receiptsData.length === 0 && "You have no receipts"}</div> 
        
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
        <div className="delete-all-receipts">
          {this.props.receiptsData.length > 1 ? <button onClick={this.props.deleteAllReceipts}>
            Delete All Receipts
          </button> : null}
        </div>
      </div>
    );
  }
}

export default ShowAllReceipts;
