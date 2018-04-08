import React from 'react';
import Communication from './component/Communication';
import JoinScreen from './screen/Join';
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
