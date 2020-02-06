import React, { Component } from "react";

class ButtonShowAllReceipts extends Component {
  state = {};
  render() {
    return (
      <button
        className="show-all-btn"
        type="button"
        onClick={this.props.showAllReceipts}
      >
        Show All Receipts
      </button>
    );
  }
}

export default ButtonShowAllReceipts;
