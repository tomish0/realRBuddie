import React, { Component } from "react";
import ShowReceipt from "./ShowReceipt";
import FilterReceipts from "./FilterReceipts";

class ShowAllReceipts extends Component {
  state = {};
  render() {
    return (
      <div>
        <FilterReceipts filter={this.props.filter} />
        {this.props.receiptsData.length == 0 && "You have no receipts"}
        {this.props.receiptsData.map((receipt, index) => {
          return (
            <div key={index}>
              <ShowReceipt receipt={receipt} isDuplicate={false} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShowAllReceipts;
