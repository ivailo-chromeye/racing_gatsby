import React from 'react';
import s from './style.module.css'

const TextBox = props => {
  // console.log(props);
  return (
    <div
      style={{
        background: `var(--${props.background})`,
        color: "var(--white)",
        fontFamily: "proximanovaa-bold",
        padding: "10px 10px",
        borderTop: `2px solid var(--${props.borderColor})`,
      }}
    >
      <h3
        style={{
          lineHeight: "1.1em"
        }}
      >
        {props.children}
      </h3>
    </div>
   )
}

export default TextBox