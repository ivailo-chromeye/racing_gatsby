import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick";

import styles from "../styles/pageHeadline.module.css"
import '../styles/slickSlider.css';

const FreeBetsComponent = (props) => {
    const freeBetsData = useStaticQuery(graphql`
    query freeBetsQuery {
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const freeBets = freeBetsData.allWordpressAcfFreebets.edges

    function FreeBetOffer(data) {
        var offerData = data.node.acf
        return (
            <>
                <div key={offerData.offer_title}>
                    <div>
                        <h3 className={styles.fbCopy}>{offerData.offer_title}</h3>
                        <h3 className={styles.fbSubcopy}>{offerData.offer_subtitle}</h3>

                        <div className={styles.fbBtn}>
                            <div>
                                <a className={styles.offerButton} target="_blank" href={offerData.cta_url}>{offerData.cta_copy}</a>
                            </div>
                        </div>

                        <div className={styles.fbTerms} dangerouslySetInnerHTML={{ __html: offerData.terms }}></div>
                    </div>
                </div>
            </>
        )
    }

    // console.log(freeBets)

    function FreeBetsSlider() {
        return (
            <>
                <Slider className="free-bets-slider" {...settings}>
                {freeBets.map(fb => {
                    if (props.place == 'homepage') {
                        if (fb.node.acf.show_on_homepage) {
                            return (
                                <div key={fb.node.id}>
                                    <FreeBetOffer {...fb}/>
                                </div>
                            )
                        }
                    } else {
                        return (
                            <div key={fb.node.id}>
                                <FreeBetOffer {...fb}/>
                            </div>
                        )
                    }
                })}
                </Slider>
            </>
        )
    }

    return <FreeBetsSlider {...props}/>
}

export default FreeBetsComponent
