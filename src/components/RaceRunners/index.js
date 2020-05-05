import React, { Fragment, useState } from 'react'
import TooltipSVG from '../../images/tooltip.svg';
import SpotlightSVG from '../../smallComponents/svg/spotlightSvg';
import s from '../../templates/race.module.css';
import styleRacecards from '../../styles/racecards.module.css'
import {rpModal} from '../../helper/index';
import ReactTooltip from "react-tooltip";
import PlaceBetBtn from '../../smallComponents/PlaceBetBtn'

const tableTop = [
  {filter: "start_number", label: "NO.DRAW FORM", tooltip: "Sort by Saddle Number"},
  {filter: "horse_name", label: "HORSE", tooltip: "Sort by Haddle Name"},
  {filter: "odds", label: "ODDS", tooltip: "Sort by Best Odds"},
  {filter: "jockey|trainer", label: "JOCKEY|TRAINER", tooltip: "Sort by Trainer"},
  {filter: "age", label: "AGE", tooltip: "Sort by Horse age"},
  {filter: "wgt", label: "WGT", tooltip: "Sort by Weight"},
  {filter: "or", label: "OR", tooltip: "Sort by Official Rating"},
  {filter: "rpr", label: "RPR", tooltip: "Sort by Racing Post Rating"},
];
const active = {borderBottom: "2px solid var(--yellow_active_filter)"};

const RaceRunners = ({ runners, applyFilter, activeFilter, setModal }) => {
  const [state, setState] = useState({activeList: []});

  const openModal = (runner) => {
    setModal(prevState => {
      return {
        ...prevState,
        open: true,
        runner,
      };
    })
  }

  const spotlightClick = (horse_uid) => {
    console.log('spotliht click');
    let array = state.activeList;

    if(state.activeList.indexOf(horse_uid) === -1) { // not in the array
      array.push(horse_uid)
    } else {
      array.splice(state.activeList.indexOf(horse_uid), 1)
    }
    console.log(array);
    setState({
      ...state.activeSpotlights,
      activeList: array,
    });

  }

  console.log('render');

  return (
    <div className={s.runners_and_ad}>
    <div className={s.runners}>
      <table>
        <thead>
          <tr>
            {
              tableTop.map(({label, filter, tooltip}, i) => {
                // console.log(activeFilter);
                return (
                    <th key={i}>
                    <div
                      className={s.th_div}>

                      {filter !== "jockey|trainer" ? 

                        <span 
                          style={activeFilter === filter ? active : null}
                          onClick={() => applyFilter(filter)}>{label}</span> :

                        <>
                          <span 
                            style={activeFilter === filter.split("|")[0] ? active : null}
                            onClick={() => applyFilter(filter.split("|")[0])}>{label.split("|")[0]}</span>&
                          <span 
                            style={activeFilter === filter.split("|")[1] ? active : null}
                            onClick={() => applyFilter(filter.split("|")[1])}>{label.split("|")[1]}</span>
                        </>
                      }
                      <div className="tooltip">
                        <ReactTooltip />
                        <TooltipSVG 
                          data-effect="solid"
                          data-place="bottom"
                          data-tip={tooltip} />
                      </div>
                    </div>
                    </th>
                  )
              })
            }
            
          </tr>
        </thead>
        <tbody>
          {runners.map(runner => {
            const spotlightActive = state.activeList.indexOf(runner.horse_uid) > -1;

            return (
              <Fragment key={runner.horse_uid}>
                <tr className={'runner_tr'} >
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
                        <div 
                          onClick={() => spotlightClick(runner.horse_uid)}
                          className="horse-box-right-bottom">
                          <SpotlightSVG active={spotlightActive} />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="padding-2">
                    <PlaceBetBtn togglePad={() => openModal(runner)}>
                      33/1
                    </PlaceBetBtn>
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
                  <td>11-7</td>
                  <td>155</td>
                  <td>158</td>
                </tr>
                {spotlightActive && <tr className={s.runner_spotlight}>
                  <td colSpan={8}>
                    <div className="spotlight_flex">Lorem text for {runner.horse_name}</div>
                  </td>
                </tr>}
              </Fragment>
            )
          })}
          
        </tbody>
      </table>
    </div>
    <div className="small-ad-container"></div>
  </div>
  )
}

export default RaceRunners;