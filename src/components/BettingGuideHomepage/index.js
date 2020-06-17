import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import ArticleComponent from "../ArticleComponent"
import SectionTitle from "../SectionTitle"

const BettingGuideHomepage = () => {
    const pageData = useStaticQuery(graphql`
        query BettingGuideHome {
            wordpressPage(wordpress_id: {eq: 276}) {
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
    
    const bettinArticle = {
        'image': pageData.wordpressPage.acf.betting_image,
        'title': pageData.wordpressPage.acf.betting_title,
        'text': pageData.wordpressPage.acf.betting_text
    }

    return (
        <>
            <SectionTitle horse={true} title={'Cheltenham Festival Betting'}/>
            <ArticleComponent {...bettinArticle} />
        </>
    )
}

export default BettingGuideHomepage
