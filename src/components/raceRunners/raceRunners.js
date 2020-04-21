import React from 'react'

import TooltipSVG from '../../images/tooltip.svg';
import SpotlightSVG from '../../images/spotlight.svg';

import s from '../../templates/race.module.css';
import styleRacecards from '../../styles/racecards.module.css'

const RaceRunners = ({ runners, applyFilter }) => {



  return (
    <div className={s.runners_and_ad}>
    <div className={s.runners}>
      <table>
        <thead>
          <tr>
            <th>
              <div
                className={s.th_div}>
                <span onClick={() => applyFilter("start_number")}>NO.DRAW FORM</span>
                <div className="tooltip">
                  <span className="tooltiptext">Sort by Saddle Number</span>
                  <TooltipSVG />
                </div>
              </div>
            </th>
            <th>
              <div 
                className={s.th_div}>
                <span onClick={() => applyFilter("horse_name")}>HORSE</span>
                <div className="tooltip">
                  <span className="tooltiptext">Sort by Horse Name</span>
                  <TooltipSVG />
                </div>
              </div>
            </th>
            <th>
              <div 
                className={s.th_div}>
              <span onClick={() => applyFilter("odds")}>ODDS</span><div className="tooltip">
                <span className="tooltiptext">Sort by Best Odds</span>
                <TooltipSVG />
              </div>
              </div>
            </th>
            <th>
              <div className={s.th_div}>
                <span onClick={() => applyFilter("jockey")}>JOCKEY</span>&
                <span onClick={() => applyFilter("trainer")}>TRAINER</span>
                <div className="tooltip">
                  <span className="tooltiptext">Sort by Trainer</span>
                  <TooltipSVG />
                </div>
              </div>
            </th>
            <th>
              <div className={s.th_div}>
                <span onClick={() => applyFilter("age")}>AGE</span>
                <div className="tooltip">
                  <span className="tooltiptext">Sort by Horse Age</span>
                  <TooltipSVG />
                </div>
              </div>
            </th>
            <th>
              <div className={s.th_div}>
                <span onClick={() => applyFilter("wgt")}>WGT</span>
                <div className="tooltip">
                  <span className="tooltiptext">Sort by Weight</span>
                  <TooltipSVG />
                </div>
              </div>
            </th>
            <th>
              <div className={s.th_div}>
                <span onClick={() => applyFilter("or")}>OR</span>
                <div className="tooltip">
                  <span className="tooltiptext">Sort by Official Rating</span>
                  <TooltipSVG />
                </div>
              </div>
            </th>
            <th>
              <div className={s.th_div}>
                <span onClick={() => applyFilter()}>RPR</span>
                <div className="tooltip">
                  <span className="tooltiptext">Sort by Racing Post Rating</span>
                  <TooltipSVG />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          
          {runners.map(runner => {
            // console.log({runner});
            return (
              <tr className={'runner_tr'} key={runner.horse_uid}>
                <td>
                  <div className="start_number">{runner.start_number}</div>
                  <div className="form">{runner.figures}</div>
                </td>

                <td className={s.horse_box}>
                  <div className={s.horse_box_flex}>
                    <div className={s.horse_box_left}>
                      <img src="https://images.racingpost.com/png_silks/8/4/5/170548.png" />
                    </div>
                    <div className={s.horse_box_right}>
                      <div 
                        onClick={() => rpModal({
                          type: 'horse', 
                          id: runner.horse_uid, 
                          name: runner.horse_name,
                          date: null,
                        })}
                        className={s.horse_box_right_top}>
                        {runner.horse_name}
                      </div>
                      <div className="horse-box-right-bottom">
                        <SpotlightSVG  />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="padding-2">
                  <div className={styleRacecards.odd}>33/1</div>
                </td>  

                <td>
                  <div
                    onClick={() => rpModal({
                      type: 'jockey',
                      id: runner.jockey_uid,
                      name: runner.jockey_name,
                      date: null,
                    })}
                    className={s.trainer}>
                      <span className={s.trainerSpan}>J:</span>
                      {runner.jockey_name}
                  </div>   
                  <div
                    onClick={() => rpModal({
                      type: 'trainer',
                      id: runner.trainer_id,
                      name: runner.trainer_stylename,
                      date: null,
                    })}
                    className={s.trainer}>
                      <span className={s.trainerSpan}>T:</span>
                      {runner.trainer_stylename}
                  </div>   
                </td>

                <td>{runner.horse_age}</td>

                <td><div className="wgt">11-7</div></td>
                <td>155</td>
                <td>158</td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
    </div>
    <div className="small-ad-container">
      
    </div>
  </div>
  )
}

export default RaceRunners;