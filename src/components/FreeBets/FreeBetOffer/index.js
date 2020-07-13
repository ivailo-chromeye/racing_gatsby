import React from "react"
import st from "./styles.module.scss"

import { LazyLoadImage } from 'react-lazy-load-image-component';

const FreeBetOffer = (data) => {
    console.log(data)
    const id = data.id
    const offer = data.acf;

    return (
        <div key={id} className={st.offer}>
            <div>
                <LazyLoadImage alt={'ico'} src={offer.bookmaker_icon ? offer.bookmaker_icon.source_url : "https://via.placeholder.com/150x150"}/>
                {/* <img src={offer.bookmaker_icon ? offer.bookmaker_icon.source_url : "https://via.placeholder.com/150x150"} alt=""/> */}
            </div>
            <div>
                <div className={st.innerWrap}>
                    <div className={st.offerCopy}>
                        <div>
                            <div className={st.innerTop}>
                                <h3>{offer.bookmaker_name}</h3>
                                <div className={st.starRating}>
                                    <span className={st.starRatingActual} style={{width: offer.review_rating * 20}}></span>
                                </div>
                            </div>
                            <h2>{offer.offer_title}</h2>
                        </div>
                    </div>
                    <div>
                        <div className="offer-bottom">
                            <a className={st.offerBtn} rel="noopener" target="_blank" href={offer.cta_url}>{offer.cta_copy}</a>
                        </div>
                    </div>
                    <div className={st.offerTerms} dangerouslySetInnerHTML={{ __html: offer.terms }}></div>
                </div>
            </div>
        </div>
    )
}

export default FreeBetOffer