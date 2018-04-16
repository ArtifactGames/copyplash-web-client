import React from 'react';
import { Question } from '../component';
import ActionCodes from "../config/ActionCodes";

class Round extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: 0,
      answers: [],
      answer: '',
    }
  }
  
  setValue = (answer) => {
    this.setState({ answer })
  }
  
  hasMoreQuestions = () => this.state.currentQuestion + 1 < this.props.questions.length;
  
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.hasMoreQuestions()) {
      
      this.setState((prevState, _) => ({
        currentQuestion: prevState.currentQuestion + 1,
        answers: [
          ...prevState.answers,
          prevState.answer
        ],
        answer: '',
      }));
      
    } else {
      this.props.send({
        action: ActionCodes.ROUND_FINISH_PLAYER,
        payload: this.state.answers
      })
      this.props.nextState();
    }
  }
  
  render() {
    const { currentQuestion, answer } = this.state;
    const { questions } = this.props;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <Question
          question={questions[currentQuestion]}
          value={answer}
          setValue={this.setValue}
        />
        {
          answer.length > 0 &&
          <input type="submit" value={this.hasMoreQuestions() ? 'Next' : 'Send!'}/>
        }
      </form>
    )
  }
}

export { Round }