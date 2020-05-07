import React, { useState } from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql } from "gatsby";
import s from '../styles/freeBetsPage.module.css';


const FreeBetsPage = (props) => {
  const [filter, setFilter] = useState("none");


  const freeBetsData = useStaticQuery(graphql`
    {
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

  const { nodes } = props.data.allWordpressWpFreebets;
  console.log(nodes);

  return (
    <Layout>
      <div className={s.offers_container}>
        <div>
          <select defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
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
        {nodes
          .filter(offer => {
            console.log(filter);
            if(filter === "none") return true;
            return offer.acf.bookmaker_name === filter
          })
          .map(offer => {
          let id = offer.id
          offer = offer.acf;

          return (
            <div 
              key={id}
              className={s.offer}>
              <div className={s.offer_wrap}>
                <div className="ofr-img">
                  <img src="https://via.placeholder.com/150x150" alt=""/>
                </div>
                <div className={s.offer_inner}>
                  <div className={s.flex}>
                    <div className={s.offer_det}>
                      <div className={s.title_rating_wrap}>
                        <div className={s.title_and_rating}>
                          <h3>{offer.bookmaker_name}</h3>
                          <div className={s.star_ratings_sprite}>
                            <span 
                              className={s.star_ratings_sprite_rating}
                              style={{width: "90%"}}></span>
                          </div>
                        </div>
                        <h2>{offer.offer_title}</h2>
                        <h4>{offer.offer_subtitle}</h4>
                      </div>
                    </div>
                    <div className={s.ofr_side}>
                      <div className="offer-bottom">
                        <div className="device-desktop">
                          <a className={s.offer_button} rel="nofollow" target="_blank" 
                            href="https://google.com">{offer.cta_copy}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={s.offer_terms}>
                    <p>{offer.terms}</p>
                  </div>
                </div>
              </div>
            </div>
            )
        })}
      </div>
    </Layout>
  )
}

export default FreeBetsPage;