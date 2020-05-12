import React from "react"
import st from "./styles.module.scss"

const MultipleSelections = (data) => {
    return  (
        <div>
            {data.selections.map(sel => {
                return (
                    <div key={sel.horse.horse_uid} className={st.selection}>
                        <img src={sel.horse.silk_image_png}/>
                        <div>
                            <h3>{sel.horse.horse_name}</h3>
                            <h4>{sel.race.title}</h4>
                        </div>
                        <div>2.48</div>
                    </div>
                )
            })}
        </div>
    )
}

export default MultipleSelections