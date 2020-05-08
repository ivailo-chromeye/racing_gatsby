import React from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby'

const Betting = () => {

  const data = useStaticQuery(graphql`
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
  `);

  console.log(data);

  return (
    <Layout>
      Betting page
    </Layout>
  )
}

export default Betting;