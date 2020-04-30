import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Slider from "react-slick";
import '../../styles/slickSlider.css';

import st from "./styles.module.scss"

import SectionTitle from "../SectionTitle"

const FreeBetsShortform = (props) => {
    const freeBetsShortformData = useStaticQuery(graphql`
    query freeBetsShortformQuery {
        allWordpressAcfFreebets {
          edges {
            node {
              id
              acf {
                bonus_code
                bookmaker_name
                cta_copy
                cta_url
                cta_url_android
                cta_url_ios
                cta_url_mobile
                expires
                faq
                featured
                min_odds
                new_customer_offer
                new_customer_offer_label
                offer_subtitle
                offer_title
                recommended_offer
                review_rating
                show_on_homepage
                show_subtitle
                starts
                terms
              }
            }
          }
        }
      }   
    `)

    const freeBets = freeBetsShortformData.allWordpressAcfFreebets.edges

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    function FreeBetOffer(data) {
        var offerData = data.node.acf
        var bookmaker = offerData.bookmaker_name
        return (
            <div className={st.freeBetOffer} key={offerData.offer_title}>
                <div className={[st[bookmaker], st.offerTop].join(' ')} style={{backgroundImage: `url(https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/free-bet-logos/${offerData.bookmaker_name}.jpg)`}}></div>
                <div className={st.freeBetBody}>
                    <h2>{offerData.offer_title}</h2>
                    <h3>{offerData.offer_subtitle}</h3>
                    <a target="_blank" href={offerData.cta_url}>{offerData.cta_copy}</a>
                    <div className={st.fbTerms} dangerouslySetInnerHTML={{ __html: offerData.terms }}></div>
                </div>
            </div>
        )
    }

    function FreeBetsSlider() {
        return (
            <>
                <SectionTitle title={'Cheltenham Festival Free bets'}/>
                <Slider className={st.freeBetsSlider} {...settings}>
                {freeBets.map(fb => {
                    if (props.filter == 'homepage') {
                        if (fb.node.acf.show_on_homepage) {
                            return (
                                <FreeBetOffer key={fb.node.id} {...fb}/>
                            )
                        }
                    } else {
                        return (
                            <FreeBetOffer key={fb.node.id} {...fb}/>
                        )
                    }
                })}
                </Slider>
            </>
        )
    }

    return <FreeBetsSlider {...props}/>
}

export default FreeBetsShortform