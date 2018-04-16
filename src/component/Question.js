import React from 'react';

class Question extends React.Component {
  
  handleOnChange = ({ target }) => {
    const { value } =  target;
    this.props.setValue(value)
  }
  
  render() {
    return (
      <div>
        <h3>{this.props.question}</h3>
        <input
          type="text"
          onChange={this.handleOnChange}
          value={this.props.value}
        />
      </div>
    )
  }
}

export { Question }