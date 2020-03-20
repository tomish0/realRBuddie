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
    return (
      // If showFeedback is true, which is set when the local storage count reaches 10 (App: 55),
      // then show feedback form
      // When button is clicked, the link is used to open email,
      // with contents being whats typed into textarea as is set in state
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
