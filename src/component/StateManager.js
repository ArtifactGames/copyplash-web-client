import React from 'react';
import {
  Join,
  WaitingGameStart
} from "../screen";

class StateManager extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      screen: <Join/>,
      nextScreens: [<WaitingGameStart/>],
      session: {},
    }
    
    this.nextState = this.nextState.bind(this)
  }
  
  nextState(session) {
    const { nextScreens } = this.state;
    if (nextScreens.length > 0) {
      this.setState((prevState, _) => ({
        screen: nextScreens[0],
        nextScreens: nextScreens.slice(1),
        session: {...prevState.session, ...session},
      }))
    }
  }
  
  render() {
    const { children } = this.props;
    let { screen } = this.state;
    const childrenState = {
      screen: {
        ...screen,
        props: {
          ...screen.props,
          nextState: this.nextState,
          session: this.state.session
        },
      },
    }
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, childrenState));
    
    return (
      <div>{childrenWithProps}</div>
    )
  }
}

export { StateManager };