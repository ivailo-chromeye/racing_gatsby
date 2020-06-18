import React from "react";
import s from '../../templates/race.module.css';
import ReactTooltip from "react-tooltip";
import TooltipSVG from '../../images/tooltip.svg';

const tableTop = [
  {
    filter: "start_number",
    label: "NO.DRAW FORM",
    tooltip: "Sort by Saddle Number",
  },
  { filter: "horse_name", label: "HORSE", tooltip: "Sort by Haddle Name" },
  { filter: "odds", label: "ODDS", tooltip: "Sort by Best Odds" },
  {
    filter: "jockey|trainer",
    label: "JOCKEY|TRAINER",
    tooltip: "Sort by Trainer",
  },
  { filter: "age", label: "AGE", tooltip: "Sort by Horse age" },
  { filter: "wgt", label: "WGT", tooltip: "Sort by Weight" },
  { filter: "or", label: "OR", tooltip: "Sort by Official Rating" },
  { filter: "rpr", label: "RPR", tooltip: "Sort by Racing Post Rating" },
]

const TableTop = ({ activeFilter, active }) => {
  return (
    <tr>
      {tableTop.map(({ label, filter, tooltip }, i) => {
        // console.log(activeFilter);
        return (
          <th key={i}>
            <div className={s.th_div}>
              {filter !== "jockey|trainer" ? (
                <span
                  style={activeFilter === filter ? active : null}
                  onClick={() => applyFilter(filter)}
                >
                  {label}
                </span>
              ) : (
                <>
                  <span
                    style={
                      activeFilter === filter.split("|")[0] ? active : null
                    }
                    onClick={() => applyFilter(filter.split("|")[0])}
                  >
                    {label.split("|")[0]}
                  </span>
                  &
                  <span
                    style={
                      activeFilter === filter.split("|")[1] ? active : null
                    }
                    onClick={() => applyFilter(filter.split("|")[1])}
                  >
                    {label.split("|")[1]}
                  </span>
                </>
              )}
              <div className="tooltip">
                <ReactTooltip />
                <TooltipSVG
                  data-effect="solid"
                  data-place="bottom"
                  data-tip={tooltip}
                />
              </div>
            </div>
          </th>
        )
      })}
    </tr>
  )
}

export default TableTop
