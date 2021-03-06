import React, { useState, useEffect } from "react"

const GridLayout = props => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      function handleWindowSizeChange() {
        setWindowWidth(window.innerWidth)
      }

      handleWindowSizeChange()
      window.addEventListener("resize", handleWindowSizeChange)
      return () => window.removeEventListener("resize", handleWindowSizeChange)
    }, [windowWidth])

    const result = [];

    for (let i = 0; i < props.children.length; i++) {
        result.push(
          <div key={i} style={{
            flex: 1,
            maxWidth: windowWidth > props.responsiveFull ? props.children[i].props.width : '100%',
            flexBasis: windowWidth > props.responsiveFull ? props.children[i].props.width : '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              margin: windowWidth > props.responsiveFull ? `0 ${props.sideGap/2}px ${props.bottomGap}px` : `0 ${props.responsiveSideGap/2}px ${props.responsiveBottomGap}px`,
              height: props.equalHeight ? '100%' : '',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {props.children[i]}
            </div>
          </div>
        );
    }
    // console.log('render');

    return (
      <div style={{ overflow: 'hidden' }}>
        <div style={{ 
          flexWrap: 'wrap',
          display: 'flex',
          margin: `0 -${props.sideGap/2}px`
        }}>
          {result}
        </div>
      </div>
    );
}

GridLayout.defaultProps = {
    sideGap: 20,
    responsiveSideGap: 10,
    bottomGap: 20,
    responsiveBottomGap: 10,
    responsiveFull: 768,
    equalHeight: false
};

export default GridLayout