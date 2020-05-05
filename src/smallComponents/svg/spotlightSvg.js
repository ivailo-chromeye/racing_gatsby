import React from 'react';

const toggledStyles = {
  fill: "#fff",
  background: "#22b51f",
  padding: 2,
}

const defaultStyles = {
  cursor: "pointer",
  height: 14,
  width: 14,
}

const activeStyles = {
  ...defaultStyles,
  ...toggledStyles,
}

const SpotlightSvg = ({ active }) => {
  return (
    <svg style={active ? activeStyles : defaultStyles} 
    
    viewBox="0 0 100 100">  
      <title>icon-spotlight</title>
      <path id="XMLID_9722_" d="M60.7,79H39.5c-2.1,0-3.5-0.8-3.5-2.9c0-6.4-4.9-11.1-9.9-16c-4.9-5.6-11.3-12.7-11.3-24.7
        C14.8,15.5,30.3,0,50.1,0s35.3,16.2,35.3,35.3c0,12.7-6.4,21.2-12,26.1c-4.2,4.2-9.2,8.3-9.2,13.9C64.2,78.2,62.8,79,60.7,79z
        M43.2,71h14c1.4-7.1,7-10.9,11.3-15.1c4.9-4.9,9.9-11.4,9.9-20.5c0-15.5-12.7-27.6-27.5-27.6s-28.2,12-28.2,27.5
        c0,8.5,4.2,14.2,9.2,19.2C36,58.7,41.7,63.9,43.2,71z"></path>
      <path d="M64.2,94c0,2.8-2.2,5-5,5h-18c-2.8,0-5-2.2-5-5v-4c0-2.8,2.2-5,5-5h18c2.8,0,5,2.2,5,5V94z"></path>
    </svg>
  )
}

export default SpotlightSvg;



