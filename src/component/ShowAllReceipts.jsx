import React, { Component } from "react";
import ShowReceipt from "./ShowReceipt";

class ShowAllReceipts extends Component {
  state = {};
  render() {
    console.log("rec data xxx: ", this.props.receiptsData);
    return (
      <div>
        {this.props.receiptsData.map((receipt, index) => {
          return (
            <div key={index}>
              <ShowReceipt
                receipt={receipt}
                isDuplicate={false}
                toggleQrReader={() => {}}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShowAllReceipts;
