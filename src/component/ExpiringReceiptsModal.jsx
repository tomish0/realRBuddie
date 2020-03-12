import React, { Component } from "react";
import "../styles/ExpiringModal.css";

class ExpiringModal extends Component {
  render() {
    return (
      <div
        className={this.props.displayModal ? "expiring-receipts-modal" : "hidden"}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Receipts About To Expire</h2>
            <span
              id="close-fixed-mob"
              className="fas fa-times close" 
              onClick={this.props.closeModal}
            ></span>
          </div>
          <ul>
            {this.props.expiringReceipts.map((el, i) => {
              return (
                <li key={i}>
                  {el.vendor}: #{el.id}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ExpiringModal;
