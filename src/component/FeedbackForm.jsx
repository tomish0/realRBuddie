import React, { Component } from "react";
import "../styles/FeedbackForm.css";

class FeedbackForm extends Component {
  state = {
    feedback: ""
  };

  onInputChange = event => {
    this.setState({ feedback: event.target.value });
  };

  render() {
    console.log(this.state.feedback);
    return (
      <div>
        {this.props.showFeedback && (
          <div className="feedback-wrapper">
            <textarea
              type="text"
              placeholder="What do you think of the app?"
              onChange={this.onInputChange}
            ></textarea>
            <a
              href={
                "mailto:rbuddieltd@gmail.com?subject=RBuddie%20Feedback&body=" +
                this.state.feedback
              }
            >
              <button>Send Feedback</button>
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default FeedbackForm;
