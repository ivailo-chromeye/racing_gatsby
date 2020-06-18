import React from 'react';

const arrow = ({ active, onClick }) => {
  
  return (
    <svg 
      onClick={onClick}
      style={{
        width: 16,
        height: 16,
        position: 'static',
        top: 18,
        bottom: 0,
        right: 8,
        margin: 0,
        display: 'inline-block',
        fill: 'var(--black)',
        transform: active ? "rotate(0deg)" : "rotate(-90deg)",
        transition: "all 0.25s",
      }}
      viewBox="0 0 100 100">
      <title>down</title>
      <rect opacity="0" width="100" height="100"></rect>
      <path d="M96.7,32.9L52.6,77c-1.6,1.6-4.1,1.6-5.7,0L3.3,33.4c-1.6-1.6-1.6-4.1,0-5.7l4.2-4.2c1.6-1.6,4.1-1.6,5.7,0l36.6,36.6
      L86.8,23c1.6-1.6,4.1-1.6,5.7,0l4.2,4.2C98.3,28.8,98.3,31.3,96.7,32.9z"></path>
    </svg>
  )
}

export default arrow;