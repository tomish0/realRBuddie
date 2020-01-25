import React, { Component } from 'react';
import '../styles/Button.css'

class Button extends Component {
    render() {
        return (<button className="btn" type="button" onClick={this.props.toggleQrReader}>Add New Receipt</button>);
    }
}

export default Button;