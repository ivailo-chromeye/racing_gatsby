import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import PageHeadlineComponent from "../components/pageHeadline"
import FreeBetsComponent from "../components/freeBets"
import FeedRaces from "../components/feedRaces"
import NewsItemsComponent from "../components/newsSlider"

import FreeBetsShortform from "../components/freeBetsShortform"
import GridLayout from "../components/GridLayout"

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
                }
            }
        }      
    `)

    const pageTitle = pageData.wordpressPage.acf.title
    const pageSubtitle = pageData.wordpressPage.acf.subtitle
    
    return (
        <>
            <Layout>
                <SEO title="Home" />
                <PageHeadlineComponent title={pageTitle} subtitle={pageSubtitle}/>
                <FeedRaces/>
                <FreeBetsShortform filter="homepage"/>
                <NewsItemsComponent/>

                <GridLayout responsiveFull={1024}>
                    <div style={{height: '60px', background: 'coral'}} width="60%"></div>
                    <div style={{height: '60px', background: 'coral'}} width="40%"></div>
                    <div style={{height: '60px', background: 'coral'}} width="100%">
                        qweqwe
                    </div>
                    <div style={{height: '60px', background: 'coral'}}></div>
                    <div style={{height: '60px', background: 'coral'}}></div>
                    <div style={{height: '60px', background: 'coral'}}></div>
                    <div style={{height: '60px', background: 'coral'}}></div>
                </GridLayout>
            </Layout>
        </>
    )
}

export default Homepage
