import React from 'react';
import { Header, StateManager, Communication } from './component';
import './App.css';

class App  extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Communication>
            {this.props.screen}
        </Communication>
      </div>
    )
  }
}

export default () => (
  <StateManager>
    <App/>
  </StateManager>
);
