import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick";

import SectionTitleComponent from "../../components/sectionTitle"

import '../../styles/slickSlider.css';

const NewsItemsComponent = (props) => {
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
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    const newsItems = newsItemsData.allWordpressAcfNews.edges

    function NewsItem(data) {
        var newsData = data.node.acf
        return (
            <div>
                <img src={newsData.image.source_url}/>
                <h3>{newsData.title}</h3>
                <h4>{newsData.subtitle}</h4>
                <p>{newsData.text}</p>
            </div>
        )
    }

    // console.log(newsItems)

    function NewsSlider() {
        return (
            <>
                <SectionTitleComponent title={'News'}/>
                <Slider className="news-slider" {...settings}>
                {newsItems.map(nws => {
                    return (
                        <div key={nws.node.id}>
                            <NewsItem {...nws}/>
                        </div>
                    )
                })}
                </Slider>
            </>
        )
    }

    return <NewsSlider {...props}/>
}

export default NewsItemsComponent
