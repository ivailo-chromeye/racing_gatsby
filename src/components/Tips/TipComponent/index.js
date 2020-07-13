import React from "react"
import st from "./styles.module.scss"
import SingleSelection from "../SingleSelection"
import MultipleSelections from "../MultipleSelections"

const TipComponent = (data) => {
    return (
        <div className={st.tip}>
            <div className={st.tipAuthor}>
                <img alt="img" src="https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200302133821/David-Jennings.png" />
                <div>
                    <h3>Joe Black</h3>
                    <div className={st.tipType}>
                        <h3>{data.type}</h3>
                    </div>
                </div>
            </div>
            
            <div className={[st[data.bookmaker], st.bookmaker].join(' ')} style={{backgroundImage: `url(https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/free-bet-logos/${data.bookmaker}.jpg)`}}></div>
            <div className={[st.tipContent, data.selections.length === 1 ? 'singleSelection' : 'multipleSelection'].join(' ')}>
                {data.selections.length == 1 ? <SingleSelection {...data}/> : <MultipleSelections {...data}/> }
            </div>
        </div>
    )
}

export default TipComponent