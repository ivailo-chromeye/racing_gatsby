import React from 'react';

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const FlexComponent = props => {
  return (
    <div style={style}>
      {props.children}
    </div>
   )
}

export default FlexComponent