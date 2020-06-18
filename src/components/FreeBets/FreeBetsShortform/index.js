import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick";
import SectionTitle from "../../SectionTitle"
import ShortFreeBetOffer from "../ShortFreeBetOffer"
import st from "./styles.module.scss"
import '../../../styles/slickSlider.css';
import '../../../styles/freeBetsShortform.css';

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
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            }
          },
        ]
    };

    return (
        <>
          <SectionTitle title={'Royal Ascot Free bets'}/>
          <Slider className={[st.freeBetsSlider, "yellowDots", "equalHeightSlider","homeShortformFreeBets"].join(' ')} {...settings}>
            {freeBets.map(fb => {
                if (props.filter == 'homepage') {
                    if (fb.node.acf.show_on_homepage) {
                        return (
                            <ShortFreeBetOffer key={fb.node.id} {...fb}/>
                        )
                    }
                } else {
                    return (
                        <ShortFreeBetOffer key={fb.node.id} {...fb}/>
                    )
                }
            })}
          </Slider>
        </>
    )
}

export default FreeBetsShortform