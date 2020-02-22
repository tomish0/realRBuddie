import React, { Component } from "react";
import "../styles/Filter.css";

class FilterReceipts extends Component {
  state = {};
  render() {
    return (
      <div className="filter">
        <div className="filter-input-i">
          <i className="fas fa-search" />
          <input
            onChange={this.onInputChange}
            type="text"
            placeholder="Search by vendor"
          />
        </div>
        <div className="filter-data-error">
          {this.props.filteredDataError ? (
            <p>You're filter failed so here are all your receipts</p>
          ) : null}
        </div>
      </div>
    );
  }

  onInputChange = event => {
    this.props.filter(event.target.value);
  };
}

export default FilterReceipts;
