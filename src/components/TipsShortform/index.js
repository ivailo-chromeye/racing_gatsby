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
            <div className={st.singleTip}>
                <div className={st.tipAuthor}>
                    <img src="https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200302133821/David-Jennings.png" />
                    <h3>Joe Black</h3>
                </div>
                <div className={st.tipType}>
                    <h3>{data.type}</h3>
                </div>

                <div className={[st[data.bookmaker], st.bookmaker].join(' ')} style={{backgroundImage: `url(https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/free-bet-logos/${data.bookmaker}.jpg)`}}></div>

                <div className={[st.tipContent, data.selections.length === 1 ? 'singleSelection' : 'multipleSelection'].join(' ')}>
                    {data.selections.map(tip => {

                        return (
                            <div className={st.raceDetails}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 21.33 21.33">
                                        <path d="M10.67,21.33A10.67,10.67,0,1,1,21.33,10.67,10.7,10.7,0,0,1,10.67,21.33Zm0-19.56a8.89,8.89,0,1,0,8.89,8.89A8.92,8.92,0,0,0,10.67,1.78Zm2,12.18L10,11.38a1,1,0,0,1-.27-0.71V6.22a0.89,0.89,0,0,1,1.78,0v4l2.4,2.4A0.94,0.94,0,0,1,12.62,14h0Z"></path>
                                    </svg>
                                    {tip.race.race_datetime.substring(0, 5)}
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 38 38.88">
                                        <path d="M-88.88-14.35h-8.4v-1.77A0.89,0.89,0,0,0-98.16-17a0.89,0.89,0,0,0-.88.88v1.77H-115v-1.77a0.89,0.89,0,0,0-.88-0.88,0.89,0.89,0,0,0-.88.88v1.77h-8.4a0.89,0.89,0,0,0-.88.88V17.47a4.43,4.43,0,0,0,4.42,4.42h29.16A4.43,4.43,0,0,0-88,17.47V-13.47A0.89,0.89,0,0,0-88.88-14.35Zm-27.84,1.77v1.77a0.89,0.89,0,0,0,.88.88,0.89,0.89,0,0,0,.88-0.88v-1.77H-99v1.77a0.89,0.89,0,0,0,.88.88,0.89,0.89,0,0,0,.88-0.88v-1.77h7.51v5.3h-34.47v-5.3h7.51Zm24.3,32.7h-29.16a2.66,2.66,0,0,1-2.65-2.65v-23h34.47v23A2.66,2.66,0,0,1-92.42,20.12Zm-22.09-10.6h-6.19a0.89,0.89,0,0,0-.88.88v6.19a0.89,0.89,0,0,0,.88.88h6.19a0.89,0.89,0,0,0,.88-0.88V10.4A0.89,0.89,0,0,0-114.51,9.51Zm-0.88,6.19h-4.42V11.28h4.42V15.7Zm11.49-6.19h-6.19a0.89,0.89,0,0,0-.88.88v6.19a0.89,0.89,0,0,0,.88.88h6.19a0.89,0.89,0,0,0,.88-0.88V10.4A0.89,0.89,0,0,0-103.91,9.51Zm-0.88,6.19h-4.42V11.28h4.42V15.7ZM-93.3,9.51h-6.19a0.89,0.89,0,0,0-.88.88v6.19a0.89,0.89,0,0,0,.88.88h6.19a0.89,0.89,0,0,0,.88-0.88V10.4A0.89,0.89,0,0,0-93.3,9.51Zm-0.88,6.19H-98.6V11.28h4.42V15.7ZM-114.51-1.09h-6.19a0.89,0.89,0,0,0-.88.88V6a0.89,0.89,0,0,0,.88.88h6.19A0.89,0.89,0,0,0-113.63,6V-0.21A0.89,0.89,0,0,0-114.51-1.09Zm-0.88,6.19h-4.42V0.67h4.42V5.09Zm11.49-6.19h-6.19a0.89,0.89,0,0,0-.88.88V6a0.89,0.89,0,0,0,.88.88h6.19A0.89,0.89,0,0,0-103,6V-0.21A0.89,0.89,0,0,0-103.91-1.09Zm-0.88,6.19h-4.42V0.67h4.42V5.09ZM-93.3-1.09h-6.19a0.89,0.89,0,0,0-.88.88V6a0.89,0.89,0,0,0,.88.88h6.19A0.89,0.89,0,0,0-92.42,6V-0.21A0.89,0.89,0,0,0-93.3-1.09Zm-0.88,6.19H-98.6V0.67h4.42V5.09Z" transform="translate(126 17)"></path>
                                    </svg>
                                    {tip.race.race_datetime.substring(6, 16)}
                                </div>
                                <h3 className={st.raceName}>{tip.horse.horse_name}</h3>
                            </div>
                        )


                    })}
                </div>
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
                        <SingleTip key={tip.id} {...tip}/>
                    )
                })}
                </Slider>
            </>
        )
    }

    return <TipsSlider {...props}/>
}

export default TipsShortform