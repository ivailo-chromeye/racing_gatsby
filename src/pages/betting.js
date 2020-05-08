import React from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import PageHeadline from '../components/pageHeadline'

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

  return (
    <Layout>
      <PageHeadline 
        title="CHELTENHAM TIPS" 
        subtitle="Racing Post’s stable tours provide a unique opportunity for behind-the-scenes access to some of the most famous yards in Britain and Ireland, providing in-depth insight into how the very best in the industry manage their illustrious runners. With esteemed trainers such as Willie Mullins, Gordon Elliott, Nicky Henderson and Paul Nicholls opening their doors to us, our Stable Tours provide you will all the inside knowledge you need to have a prosperous Cheltenham Festival." />
    </Layout>
  )
}

export default Betting;