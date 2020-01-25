import React, { Component } from "react";

class ShowReceipt extends Component {
  state = {};

  render() {
    const receipt = this.props.receipt;
    const storeLocation = receipt.storelocation;
    const items = receipt.items;
    const itemsTitle = items.map(item => {
      return item.title;
    });
    const itemsPrice = items.map(item => {
      return item.price;
    });
    const itemsReturnPeriod = items.map(item => {
      return item.returnPeriod;
    });

    return (
      <div>
        <div>this is my receipt</div>
        <div>{receipt.vendor}</div>
        <div>{receipt.receiptNumber}</div>
        <div>{receipt.purchaseTime}</div>
        <div>{receipt.purchaseDate}</div>
        <ul>
          <li>{storeLocation.name}</li>
          <li>{storeLocation.road}</li>
          <li>{storeLocation.town}</li>
          <li>{storeLocation.county}</li>
          <li>{storeLocation.postcode}</li>
        </ul>
        <ul>
          <li>{itemsTitle}</li>
          <li>{itemsPrice}</li>
          <li>{itemsReturnPeriod}</li>
        </ul>
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
