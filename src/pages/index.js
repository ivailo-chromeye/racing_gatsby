import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import PageHeadlineComponent from "../components/pageHeadline"
import FeedRaces from "../components/feedRaces"
import NewsSliderComponent from "../components/NewsSlider"
import FreeBetsShortform from "../components/FreeBetsShortform"
import GridLayout from "../components/GridLayout"
import BettingGuideHomepage from "../components/BettingGuideHomepage"


const Homepage = () => {
    const pageData = useStaticQuery(graphql`
        query MyQuery {
            wordpressPage(wordpress_id: {eq: 290}) {
                id
                slug
                title
                wordpress_id
                acf {
                    title
                    subtitle
                    betting_text
                    betting_title
                    betting_image {
                        source_url
                    }
                }
            }
        }   
    `)

    const pageTitle = pageData.wordpressPage.acf.title
    const pageSubtitle = pageData.wordpressPage.acf.subtitle
    
    const bettinArticle = {
        'image': pageData.wordpressPage.acf.betting_image,
        'title': pageData.wordpressPage.acf.betting_title,
        'text': pageData.wordpressPage.acf.betting_text
    }

    return (
        <>
            <Layout>
                <SEO title="Home" />
                {/* <PageHeadlineComponent title={pageTitle} subtitle={pageSubtitle}/> */}
                <FeedRaces/>
                <FreeBetsShortform filter="homepage"/>
                <GridLayout responsiveFull={1024} sideGap={12} equalHeight={true}>
                    <NewsSliderComponent width="60%"/>
                    <BettingGuideHomepage width="40%"/>
                </GridLayout>
            </Layout>
        </>
    )
}

export default Homepage
