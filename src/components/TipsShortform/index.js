import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Slider from "react-slick";
import SectionTitle from "../SectionTitle"
import Btn from "../../smallComponents/btn/btn"

import '../../styles/slickSlider.css';
import st from "./styles.module.scss"



const TipsShortform = (props) => {
    const tipsShortformData = useStaticQuery(graphql`
    query tipsShortformData {
        allWordpressWpRace {
            edges {
                node {
                    id
                    wordpress_id
                    acf {
                        title
                        raceid
                    }
                }
            }
        }
        allWordpressWpHorse {
            edges {
                node {
                    id
                    wordpress_id
                    acf {
                        horse_name
                        horse_uid
                        silk_image_png
                        trainer_name
                        jockey_name
                    }
                }
            }
        }
        allWordpressWpTip {
            edges {
                node {
                    id
                    acf {
                        each_way_tip
                        tip {
                            odds
                            race
                            horse
                        }
                        bookmaker {
                            label
                        }
                    }
                    author
                    date
                }
            }
        }         
    }   
    `)

    const races = tipsShortformData.allWordpressWpRace.edges
    const horses = tipsShortformData.allWordpressWpHorse.edges
    const tips = tipsShortformData.allWordpressWpTip.edges

    const tipsFormated = []
    tips.forEach(tip => {
        const tipRace = tip.node.acf.tip[0].race
        const tipHorse = tip.node.acf.tip[0].horse
        const tipAuthor = tip.node.author
        const tipBookmaker = tip.node.acf.bookmaker.label
        const tipDate = tip.node.date
        const output = {
            'race': tipRace,
            'horse': tipHorse,
            'tipster': tipAuthor,
            'date': new Date(tipDate),
            'bookmaker': tipBookmaker
        }
        tipsFormated.push(output)
    });

    const tipsOutput = []
    tipsFormated.forEach(tip => {
        horses.forEach(horse => {
            if (tip.horse === horse.node.wordpress_id) {
                tip.horse = horse.node.acf
                races.forEach(race => {
                    if (tip.race === race.node.wordpress_id) {
                        tip.race = race.node.acf.title
                        tipsOutput.push(tip)
                    }
                })
            }
        })
    })

    // To be sure that tips are sorted by date
    const sortedTips = tipsOutput.sort((a, b) => b.date - a.date)

    const printTips = sortedTips.slice(0, 5);
    console.log(printTips)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            }
          },
        ]
    };

    function SingleTip(data) {
        return (
            <div className={st[data.bookmaker]}>
                <h3>Race: {data.race}</h3>
                <h3>Horse: {data.horse.horse_name}</h3>
                <img src={data.horse.silk_image_png}/>
            </div>
        )
    }

    function TipsSlider() {
        return (
            <>
                <SectionTitle title={'Cheltenham Festival Latest Tips'}/>
                <Slider {...settings}>
                {printTips.map(tip => {
                    return (
                        <SingleTip key={tip.horse.horse_uid} {...tip}/>
                    )
                })}
                </Slider>
            </>
        )
    }

    return <TipsSlider {...props}/>
}

export default TipsShortform