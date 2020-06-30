import React from 'react';

const FlexComponent = ({ flexDirection, children }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: flexDirection
    }}>
      {children}
    </div>
   )
}

export default FlexComponent