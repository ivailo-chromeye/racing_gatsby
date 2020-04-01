import React from "react"
import styles from "../styles/pageHeadline.module.css"

const PageHeadlineComponent = ({ title, subtitle }) => {
  return (
    <div className={styles.topHeadline}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      <h3 className={styles.sectionSubtitle}>{subtitle}</h3>
    </div>
  )
}

export default PageHeadlineComponent