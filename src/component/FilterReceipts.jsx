import React, { Component } from "react";
import "../styles/Filter.css"

class FilterReceipts extends Component {
  state = {};
  render() {
    return (
      <div className="filter">
        <input
          onChange={this.onInputChange}
          type="text"
          placeholder="Search by vendor"
        />
        {this.props.filteredDataError ? <p>You're filter failed so here are all your receipts</p> : null}
      </div>
    );
  }

  onInputChange = event => {
    this.props.filter(event.target.value);
  };
}

export default FilterReceipts;
