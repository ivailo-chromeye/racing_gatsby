import React from "react"
import st from "../styles/sectionTitile.module.css"

const SectionTitleComponent = ({title}) => {
  return (
      <h2 className={st.sectionTitle}>{title}</h2>
  )
}

export default SectionTitleComponent