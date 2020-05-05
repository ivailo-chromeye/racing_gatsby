import React, { useState } from 'react';
import FlexComponent from '../../smallComponents/FlexComponent'
import ArrowSVG from '../../smallComponents/svg/arrowSvg'
import CollapseEl from './element';
import s from './styles.module.css'

const CollapseComponent = ({ label, children }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <div className={s.item_header} onClick={() => setToggled(!toggled)}>
        <FlexComponent>
          <div>{label}</div>
          <div><ArrowSVG active={toggled} /></div>
        </FlexComponent>
      </div>
    {toggled && <CollapseEl>{children}</CollapseEl>}
    </>
   )
}

export default CollapseComponent