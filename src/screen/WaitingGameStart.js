import React from 'react';
import { Loading } from "../component";

const WaitingGameStart = ({session}) => (
  <div>
    <p>player: {session.nick}</p>
    <Loading title="waiting for start game"/>
  </div>
)

export { WaitingGameStart }
