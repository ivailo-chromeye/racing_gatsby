import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick";
import SectionTitle from "../../SectionTitle"
import TipComponent from "../../Tips/TipComponent"
import '../../../styles/slickSlider.css';

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
                            race_datetime
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
                            bet_type_sel
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

    // Grouping the required tips data from Wordpress
    const races = tipsShortformData.allWordpressWpRace.edges
    const horses = tipsShortformData.allWordpressWpHorse.edges
    const tips = tipsShortformData.allWordpressWpTip.edges

    const tipsFormated = []
    tips.forEach(tip => {
        const tipAuthor = tip.node.author
        const tipBookmaker = tip.node.acf.bookmaker.label
        const tipDate = tip.node.date
        const tipType = tip.node.acf.bet_type_sel
        const selections = []
        tip.node.acf.tip.forEach(single => {
            const tipRace = single.race
            const tipHorse = single.horse
            selections.push({race: tipRace, horse: tipHorse})
        })
        const output = {
            'id': tip.node.id,
            'selections': selections,
            'tipster': tipAuthor,
            'date': new Date(tipDate),
            'bookmaker': tipBookmaker,
            'type': tipType
        }
        tipsFormated.push(output)
    });

    const tipsOutput = []
    tipsFormated.forEach(stip => {
        let pushReady = false
        stip.selections.forEach(tip => {
            horses.forEach(horse => {
                if (tip.horse === horse.node.wordpress_id) {
                    tip.horse = horse.node.acf
                    races.forEach(race => {
                        if (tip.race === race.node.wordpress_id) {
                            tip.race = race.node.acf
                            pushReady = true
                        }
                    })
                }
            })
        })
        if (pushReady) {
            tipsOutput.push(stip)
        }
    })

    // Sort and Slice to get the latest 5 tips
    const sortedTips = tipsOutput.sort((a, b) => b.date - a.date)
    const printTips = sortedTips.slice(0, 5);

    // Slider Settings
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

    // Render
    return (
        <>
            <SectionTitle title={'Cheltenham Festival Latest Tips'}/>
            <Slider className="equalHeightSlider" {...settings}>
                {printTips.map(tip => {
                    return (
                        <TipComponent key={tip.id} {...tip}/>
                    )
                })}
            </Slider>
        </>
    )
}

export default TipsShortform