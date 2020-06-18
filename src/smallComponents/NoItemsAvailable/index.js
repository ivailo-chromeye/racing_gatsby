import React from 'react';
import s from './style.module.css'

export default function NoItemsAvailable ({ message }) {
  return (
    <div className={s.no_data}>
      <img 
        src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/no-results.svg" />
      <p>{message}</p>
    </div>
   )
}