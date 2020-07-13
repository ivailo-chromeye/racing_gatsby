import React from "react"
import st from "./styles.module.css"

const SectionTitle = ({ title, backgroundColor, margin, horse }) => {
  return (
    <h2
      style={{
        backgroundColor: backgroundColor ? backgroundColor : null,
        margin: margin,
      }}
      className={[st.sectionTitle, horse ? st.horseAbove : ""].join(" ")}
    >
      {title}
    </h2>
  )
}

export default SectionTitle
