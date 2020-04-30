import React from 'react';

const QuestionSvg = () => {
  return (
    <a 
      target="_blank"
      href="https://racingpost.zendesk.com/hc/en-us/articles/208200769-Cards"
      style={{
      textDecoration: "none",
      verticalAlign: "middle",
      marginLeft: 10,
    }}>
      <svg 
        style={{
          fill: "#ffd800",
          width: 16,
          height: 16,
        }}
      viewBox="0 0 100 100">
        <path d="M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0z"></path>
        <g>
            <path fill="#262626" d="M56,80.5c0,2.2-1.8,4-4,4h-4.6c-2.2,0-4-1.8-4-4v-3.8c0-2.2,1.8-4,4-4H52c2.2,0,4,1.8,4,4V80.5z M70.9,40.3
                c-0.5,1.6-1.1,3-1.9,4.1c-0.8,1.2-1.7,2.2-2.7,3.1s-2,1.8-3,2.7c-1.2,1-2.3,2-3.3,2.9s-1.9,2-2.6,3.2c-0.8,1.2-1.4,2.6-1.8,4.1
                C55.2,62,55,63.9,55,66.2H44.8c0-2.8,0.1-5.1,0.4-7c0.3-1.9,0.7-3.6,1.4-5c0.6-1.5,1.4-2.8,2.3-3.9c0.9-1.1,2-2.2,3.3-3.2
                c1-0.9,2-1.7,2.9-2.5c0.8-0.8,1.6-1.6,2.4-2.5c0.7-0.9,1.3-1.9,1.7-3.1c0.4-1.1,0.6-2.5,0.6-4.1c0-1.9-0.3-3.5-1-4.9
                s-1.5-2.4-2.4-3.3c-0.9-0.8-1.9-1.4-3-1.8s-2-0.6-2.8-0.6c-3.9,0-6.8,1.3-8.6,3.8c-1.3,1.8-2.2,4-2.5,6.7c-0.3,2-1.9,3.5-4,3.5
                h-2.7c-2.5,0-4.3-2.2-4-4.7c0.3-1.7,0.7-3.3,1.2-4.8c1-2.8,2.5-5.2,4.5-7.3c2-2,4.4-3.6,7.2-4.7s5.9-1.6,9.4-1.6
                c2.9,0,5.6,0.4,8.1,1.3c2.5,0.8,4.6,2.1,6.5,3.7s3.3,3.6,4.4,6s1.6,5.1,1.6,8.1C71.6,36.8,71.3,38.7,70.9,40.3z"></path>
        </g>
      </svg>
    </a>
  )
}

export default QuestionSvg;