import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick";

import SectionTitle from "../SectionTitle"
import ArticleComponent from "../ArticleComponent"

import '../../styles/slickSlider.css';
import './styles.css'

const NewsSliderComponent = (props) => {
    const newsItemsData = useStaticQuery(graphql`
    query newsSlider {
        allWordpressAcfNews {
          edges {
            node {
              id
              acf {
                news_url
                subtitle
                text
                title
                image {
                  source_url
                }
              }
            }
          }
        }
      }         
    `)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            }
          },
        ]
    };

    const newsItems = newsItemsData.allWordpressAcfNews.edges

    function NewsSlider() {
        return (
            <>
                <SectionTitle horse={true} title={'Cheltenham Festival News'}/>
                <Slider className="newsSlider equalHeightSlider" {...settings}>
                  {newsItems.map(nws => {
                      return <ArticleComponent applyStyles={{margin: '0 1px'}} key={nws.node.id} {...nws.node.acf}/>
                  })}
                </Slider>
            </>
        )
    }

    return <NewsSlider {...props}/>
}

export default NewsSliderComponent
