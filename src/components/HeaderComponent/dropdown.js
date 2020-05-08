import React from 'react';
import s from './dropdown.module.css';

const Dropdown = ({ children, item, hover, }) => {


  return (
    <div 
      onMouseEnter={() => hover(item, true)}
      onMouseLeave={() => hover(item, false)}
      className={s.dropdown}>
      <div className={s.flex}>
        {children}
      </div>
    </div>
   )
}

export default Dropdown;