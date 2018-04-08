import React from 'react';

const Loading = (props) => (
  <div>
    {props.title ? <h2>{props.title}</h2> :
      <h2>Loading...</h2>}
  </div>
)

export { Loading }