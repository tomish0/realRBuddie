import React, { Component } from "react";
import "../styles/Filter.css";

class FilterReceipts extends Component {

  // everytime there is a key/word input, this method is invoked and filters all receipts based on the value. this used filtered method from App.
  onInputChange = event => {
    this.props.filter(event.target.value);
  };

  render() {
    return (
      <div className="filter">
        <div className="filter-input-i">
          <i className="fas fa-search" />
          <input
            onChange={this.onInputChange}
            type="text"
            placeholder="Search vendor, postcode or price"
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
}

export default FilterReceipts;
