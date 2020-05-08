import React from "react"
import st from "./styles.module.css"

const SectionTitle = ({title, backgroundColor}) => {
  return (
      <h2 
        style={{backgroundColor: backgroundColor ? backgroundColor : null}}
        className={st.sectionTitle}>{title}</h2>
  )
}

export default SectionTitle