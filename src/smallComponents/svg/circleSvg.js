import React from "react";
import s from "./style.module.css"

const Circle = () => {
  return (
    <svg
      className={s.circle}
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 70 70"
    >
      <title>circle_v2</title>
      <circle
        cx="35"
        cy="35"
        r="28.5"
        style={{
          fill: "#fff",
          stroke: "#e20613",
          strokeMiterlimit: 10,
          strokeWidth: "13px",
        }}
      ></circle>
    </svg>
  )
}

export default Circle