import React from 'react';
import s from '../styles/liveblog.module.css';

const Item = ({ node }) => {
  
  return (
    <div className={s.item}>
      <h2>{node.acf.title}</h2>
      <div dangerouslySetInnerHTML={{
        __html: node.acf.text
      }}></div>
    </div>
  )
}

export default Item;