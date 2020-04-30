import React from 'react'
import s from './style.module.css';
import { Link } from 'gatsby'

const RedBtn = ({ children, cta_url, background, type }) => {

  // ........ poorly written................
  
  if(type === "a") {
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
  } else {
    return (
      <Link 
        style={{
          background,
          margin: "0 0 6px"
        }}
        className={s.freeBetsButton} 
        target="_blank" 
        to={cta_url}
        >{children}
      </Link>
    )
  }

}

export default RedBtn;