import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import FeedRaces from "../components/feedRaces"
import NewsSliderComponent from "../components/newsSlider"
import FreeBetsShortform from "../components/FreeBets/FreeBetsShortform"
import GridLayout from "../components/GridLayout"
import BettingGuideHomepage from "../components/BettingGuideHomepage"
import TipsShortform from "../components/Tips/TipsShortform";
import FAQ from '../components/FAQ'

const Homepage = () => {
    return (
        <>
            <Layout>
                <SEO title="Home" />
                <div style={{background: '#f2f2f2'}}>
                <GridLayout responsiveFull={1279} sideGap={0} equalHeight={true} bottomGap={0} responsiveBottomGap={0}>
                    <FeedRaces width="80%"/>
                    <a style={{height: '100%', background: '#027b5c', textAlign: 'center'}} href="https://www.bet365.com/olp/racing-post/?affiliate=365_00929317" className="static-offer"><img src="https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200615143604/bet365_banner_v6.jpg"/></a>
                </GridLayout>
                
                <FreeBetsShortform filter="homepage"/>
                <GridLayout responsiveFull={1024} sideGap={12} equalHeight={true} bottomGap={0} responsiveBottomGap={0}>
                    <NewsSliderComponent width="50%"/>
                    <BettingGuideHomepage width="50%"/>
                </GridLayout>
                <TipsShortform/>
                <FAQ />
                </div>
            </Layout>
        </>
    )
}

export default Homepage
