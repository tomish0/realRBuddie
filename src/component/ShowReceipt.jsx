import React, { Component } from "react";

class ShowReceipt extends Component {
  state = {};

  render() {
    console.log(this.props.receipt.items);

    const receipt = this.props.receipt;
    const items = receipt.items;

    const eachItem = items.map((item, i) => {
      return (
        <ul key={i}>
          <li>{item.title}</li>
          <li>{item.price}</li>
          <li>{item.returnPeriod}</li>
        </ul>
      );
    });

    return (
      <div>
        <div>Receipt: </div>

        <div>{receipt.vendor}</div>
        <div>{receipt.receiptNumber}</div>
        <div>{receipt.purchaseTime}</div>
        <div>{receipt.purchaseDate}</div>
        <ul>
          <li>{receipt.storeLocation.name}</li>
          <li>{receipt.storeLocation.road}</li>
          <li>{receipt.storeLocation.town}</li>
          <li>{receipt.storeLocation.county}</li>
          <li>{receipt.storeLocation.postcode}</li>
        </ul>
        <div>{eachItem}</div>
        <div>{receipt.totalPrice}</div>
        <div>{receipt.amountTendered}</div>
        <div>{receipt.change}</div>
        <div>{receipt.vatValue}</div>
        <div>{receipt.vatNumber}</div>
        <div>{receipt.authorisationCode}</div>
        <div>{receipt.tenderType}</div>
        <div>{receipt.app}</div>
      </div>
    );
  }
}

export default ShowReceipt;
