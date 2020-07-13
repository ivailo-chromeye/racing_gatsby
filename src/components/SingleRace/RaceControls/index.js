import React from "react"
import QuestionSVG from "../../../smallComponents/svg/questionSvg"
import Btn from "../../../smallComponents/btn/btn"
import s from "./style.module.css"

const RaceControls = ({ raceid, raceDate }) => {
  return (
    <div className={s.detailed_flex}>
      <QuestionSVG />
      <Btn
        type="black"
        cta_url={`https://www.racingpost.com/results/2/ascot/${raceDate}/${raceid}/`}
      >
        View Full Result
      </Btn>
    </div>
  )
}

export default RaceControls
