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

            allWordpressWpRunner {
                edges {
                  node {
                    title
                    wordpress_id
                    acf {
                      horse_name
                      horse_uid
                      silk_image_png
                      trainer_stylename
                      jockey_name
                    }
                  }
                }
              }

              allWordpressWpTip {
                edges {
                  node {
                    wordpress_id
                    id
                    author
                    acf {
                      tip {
                        horse
                        race
                      }
                      each_way_tip
                      bet_type_sel
                      bookmaker {
                        label
                      }
                    }
                  }
                }
              }     
        }   
    `)

    // Grouping the required tips data from Wordpress
    const races = tipsShortformData.allWordpressWpRace.edges
    const tips = tipsShortformData.allWordpressWpTip.edges
    const horses = tipsShortformData.allWordpressWpRunner.edges

    const tipsFormated = []
    tips.forEach(tip => {
        // const tipAuthor = tip.node.author
        const tipAuthor = 'Tipster'
        const tipBookmaker = tip.node.acf.bookmaker.label
        // const tipDate = tip.node.date
        const tipDate = '2020-02-20'
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

    console.log(printTips)

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