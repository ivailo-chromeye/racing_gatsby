import React from "react"
import st from "./styles.module.css"

const SectionTitle = ({title}) => {
  return (
      <h2 className={st.sectionTitle}>{title}</h2>
  )
}

export default SectionTitle