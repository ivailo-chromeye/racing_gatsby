import React from 'react'
import s from './style.module.css';

const BlackBtn = ({ togglePad, odds, children }) => {
  return (
    <p onClick={togglePad} className={s.odd}>{children}</p>
  )
}

export default BlackBtn;