import React, { Component } from "react";
import "../styles/ExpiringModal.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ExpiringModal extends Component {
  render() {
    // Component is shown when class 'hidden' is removed when displayModal is true
    // FontAwesomeIcon used to show 'X' icon to close the modal
    // Map the expiring receipts found in App into a list of vendors and corresponding ids
    return (
      <div
        className={
          this.props.displayModal ? "expiring-receipts-modal" : "hidden"
        }
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Receipts About To Expire</h2>
            <FontAwesomeIcon
              icon={faTimes}
              className="close"
              onClick={this.props.closeModal}
            />
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
