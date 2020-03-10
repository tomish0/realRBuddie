import React, { Component } from 'react';
import '../styles/ExpiringModal.css';

class ExpiringModal extends Component {

    render() {
        console.log(this.props)
        return (
            <div className={this.props.display ? 'expiring-receipts-modal' : 'hidden'}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span id="close-fixed-mob"
                            className="fas fa-times close"
                            onClick={this.props.func}>
                        </span>
                        <h2>You Have Expiring Receipts</h2>
                    </div>
                    <ul>
                        {this.props.expiringReceipts.map((el, i) => {
                            return (
                                <li key={i}>{el.vendor}: #{el.id}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ExpiringModal;