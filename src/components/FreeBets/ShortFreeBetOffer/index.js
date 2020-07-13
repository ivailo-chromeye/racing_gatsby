import React from "react"
import st from "./styles.module.scss"
import Btn from "../../../smallComponents/btn/btn"

const ShortFreeBetOffer = (data) => {
    var offerData = data.node.acf
    var bookmaker = offerData.bookmaker_name
    return (
        <div className={st.freeBetOffer} key={offerData.offer_title}>
            <div className={[st[bookmaker], st.offerTop].join(' ')} style={{backgroundImage: `url(https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/free-bet-logos/${offerData.bookmaker_name}.jpg)`}}></div>
            <div className={st.freeBetBody}>
                <h2>{offerData.offer_title}</h2>
                {/* <h3>{offerData.offer_subtitle}</h3> */}
                <Btn type="a" background="btn_red" cta_url={offerData.cta_url} rel="noopener">
                    {offerData.cta_copy}
                </Btn>
                <div className={st.fbTerms} dangerouslySetInnerHTML={{ __html: offerData.terms }}></div>
            </div>
        </div>
    )
}

export default ShortFreeBetOffer