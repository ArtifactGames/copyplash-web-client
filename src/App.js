import React from 'react';
import Communication from './Communication';
import JoinScreen from './JoinForm';
import './App.css';

function getCurrentScreen() {
  //TODO navigate to other screen when some condition changed
  return <JoinScreen />
}

const App = () => (
  <Communication>
    {getCurrentScreen()}
  </Communication>
)

export default App;
