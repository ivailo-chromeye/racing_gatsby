import React, { useState } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import FreeBetOffer from '../FreeBetOffer'
import st from "./styles.module.scss"

const FreeBets = () => {
    const [filter, setFilter] = useState("none");

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
              bookmaker_icon {
                  source_url
              }
            }
          }
        }
      }
    `)
  
    const { nodes } = freeBetsData.allWordpressWpFreebets;

    return (
        <div className={st.freeBetsWrapper}>
            <div>
                <select className={st.filter} defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="none">SELECT A BOOKMAKER</option>
                    <option value="BETWAY">BETWAY</option>
                    <option value="WILLIAMHILL">WILLIAMHILL</option>
                    <option value="UNIBET">UNIBET</option>
                    <option value="PADDYPOWER">PADDYPOWER</option>
                    <option value="SKYBET">SKYBET</option>
                    <option value="BETFAIR">BETFAIR</option>
                    <option value="CORAL">CORAL</option>
                    <option value="LADBROKES">LADBROKES</option>
                    <option value="BET365">BET365</option>
                </select>
            </div>
            {nodes.filter(offer => {
                    console.log(filter);
                    if(filter === "none") return true;
                    return offer.acf.bookmaker_name === filter
                })
                .map(offer => {
                    return (
                        <FreeBetOffer {...offer}/>
                    )
                })}
        </div>
    )
}

export default FreeBets