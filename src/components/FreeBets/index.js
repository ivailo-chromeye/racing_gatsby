import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"

import st from "../../styles/freeBetsShortform.module.css";
import "../../styles/slickSlider.css";

import SectionTitleComponent from "../SectionTitle"

const FreeBetsComponent = props => {
  const freeBetsData = useStaticQuery(graphql`
    query freeBetsQuery {
      allWordpressWpFreebets {
        nodes {
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
  `)

  const freeBets = freeBetsData.allWordpressWpFreebets.nodes

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  }

  function FreeBetOffer(data) {
    let offerData = data
    let bookmaker = offerData.bookmaker_name
    return (
      <div className={st.freeBetsOffer} key={offerData.offer_title}>
        <div
          className={[st[bookmaker], st.fbTop].join(" ")}
          style={{
            backgroundImage: `url(https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/free-bet-logos/${offerData.bookmaker_name}.jpg)`,
          }}
        ></div>
        <h3 className={st.fbCopy}>{offerData.offer_title}</h3>
        <h3 className={st.fbSubcopy}>{offerData.offer_subtitle}</h3>
        
        <a className={st.freeBetsButton} target="_blank" href={offerData.cta_url}>{offerData.cta_copy}</a>
        <div
          className={st.freeBetsTerms}
          dangerouslySetInnerHTML={{ __html: offerData.terms }}
        ></div>
      </div>
    )
  }

  function FreeBetsSlider() {
    return (
      <>
        <SectionTitleComponent title={"Featured Cheltenham Offers"} />
        <SectionTitleComponent title={"Free bets"} />
        <Slider className="free-bets-slider" {...settings}>
          {freeBets.map(fb => {
            console.log('fb map');
            if (props.place == "homepage") {
              if (fb.node.acf.show_on_homepage) {
                return (
                  <div key={fb.id}>
                    <FreeBetOffer {...fb.acf} />
                  </div>
                )
              }
            } else {
              return (
                <div key={fb.id}>
                  <FreeBetOffer {...fb.acf} />
                </div>
              )
            }
          })}
        </Slider>
      </>
    )
  }

  return <FreeBetsSlider {...props} />
}

export default FreeBetsComponent
