import React from "react"
import styles from "../styles/pageHeadline.module.css"

// const PageHeadlineComponent = props => {
//   function PageHeadline(data) {
//     return (
//       <>
//         <div className={styles.topHeadline}>
//           <h1 className={styles.sectionTitle}>{data.title}</h1>
//           <h3 className={styles.sectionSubtitle}>{data.subtitle}</h3>
//         </div>
//       </>
//     )
//   }

//   return <PageHeadline {...props} />
// }

const PageHeadlineComponent = ({ title, subtitle }) => {
  return (
    <div className={styles.topHeadline}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      <h3 className={styles.sectionSubtitle}>{subtitle}</h3>
    </div>
  )
}

export default PageHeadlineComponent

// const PageHeadlineComponent = ({title, subtitle}) => {
//   return (
//         <div className={styles.topHeadline}>
//           <h1 className={styles.sectionTitle}>{title}</h3>
//           <h3 className={styles.sectionSubtitle}>{subtitle}</h3>
//         </div>
//      )
// }
