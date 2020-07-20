import React, { useState } from 'react';
import FlexComponent from '../../smallComponents/FlexComponent'
import ArrowSVG from '../../smallComponents/svg/arrowSvg'
import CollapseEl from './element';
import s from './styles.module.css'

const CollapseComponent = ({ 
  label, 
  children, 
  backgroundColor,
  color,
  inactiveImage,
  activeImage,
  refHook,
}) => {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <div 
        ref={refHook} 
        style={{backgroundColor}}
        className={s.item_header} onClick={() => setToggled(!toggled)}>
        <FlexComponent>
          <div style={{color}}>{label}</div>
          {!activeImage && <div><ArrowSVG active={toggled} /></div>}
          {activeImage && !toggled && <img src={activeImage} />}
          {inactiveImage && toggled && <img src={inactiveImage} />}
        </FlexComponent>
      </div>
    {toggled && <CollapseEl>{children}</CollapseEl>}
    </>
   )
}

export default CollapseComponent