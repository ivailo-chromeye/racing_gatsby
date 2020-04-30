import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import FeedRaces from "../components/feedRaces"
import NewsSliderComponent from "../components/newsSlider"
import FreeBetsShortform from "../components/freeBetsShortform"
import GridLayout from "../components/GridLayout"
import BettingGuideHomepage from "../components/BettingGuideHomepage"


const Homepage = () => {

    return (
        <>
            <Layout>
                <SEO title="Home" />
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
