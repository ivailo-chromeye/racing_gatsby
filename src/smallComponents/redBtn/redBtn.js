import React from 'react'
import s from './style.module.css';

const RedBtn = ({ children, cta_url, background }) => {
  console.log(s);
  return (
    <a 
      style={{
        background,
        margin: "0 0 6px"
      }}
      className={s.freeBetsButton} 
      target="_blank" 
      href={cta_url}
      >{children}
    </a>
  )
}

export default RedBtn;