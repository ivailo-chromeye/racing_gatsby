import React, { useState } from 'react';
import Layout from '../components/layout';
import SectionTitle from '../components/SectionTitle';
import PageHeadline from '../components/pageHeadline'
import s from '../styles/stableTours.module.css';
import ContainerComponent from '../smallComponents/container';
import { graphql, useStaticQuery, Link } from 'gatsby'
import YouTube from 'react-youtube';
import Btn from '../smallComponents/btn/btn'

let images = [
  'https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200211154514/warren-greatrex-1.jpeg',
  'https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200211153823/Olly-Murphy-1.jpeg',
  'https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200221173228/David-Pipe-Stable-Tour.jpeg',
  'https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200211143844/Colin-Tizzard-1.jpeg',
  'https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200211150153/Henry-de-Bromhead-1-1024x576.jpeg',
  'https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200221172844/Evan-Williams-Stable-Tour.jpeg', 
];
function random() {
  return images[Math.floor(Math.random() * images.length)]
} 

const videosMap = {
  first: 'bGMyzSy2P-8',
  second: 'ZHSU_kEPHnU',
  third: '4SZLISlINd0',
  forth: 'fxMpkjkLRXE',
}

const opts = {
  height: '386',
  width: '521',
  playerVars: {
    autoplay: 1,
    mute: 1,
  }
}

const StableTours = () => {
  const [ids, setIds] = useState({
    "bGMyzSy2P-8": false,
    "ZHSU_kEPHnU": false,
    "4SZLISlINd0": false,
    "fxMpkjkLRXE": false,
  });

  const videoClick = id => {
    setIds({
      ...ids,
      [id]: true,
    })
  }

  const data = useStaticQuery(graphql`
    {
      allWordpressWpStableTours {
        nodes {
          acf {
            title
            subtitle
          }
          slug
        }
      }
    }
  `);

  const tours = data.allWordpressWpStableTours.nodes;
  console.log(tours);

  return (
    <Layout>
      <PageHeadline 
        title="CHELTENHAM FESTIVAL STABLE TOURS" 
        subtitle="Racing Post’s stable tours provide a unique opportunity for behind-the-scenes access to some of the most famous yards in Britain and Ireland, providing in-depth insight into how the very best in the industry manage their illustrious runners. With esteemed trainers such as Willie Mullins, Gordon Elliott, Nicky Henderson and Paul Nicholls opening their doors to us, our Stable Tours provide you will all the inside knowledge you need to have a prosperous Cheltenham Festival." />
      
      <ContainerComponent>
        <SectionTitle title="Cheltenham Festival" />
        <div className={s.article_container}>
          {tours.slice(0,3).map(tour => {
            return (
              <div key={tour.slug} className={s.news_slider_item}>
                <div className={s.news_img}>
                  <img src={random()} />
                </div>
                <div className={s.news_copy}>
                  <h3>{tour.acf.title}</h3>
                  <h4>{tour.acf.subtitle}</h4>
                  <Link to={`/stable-tours/${tour.slug}/`}>Read more</Link>
                </div>
              </div>
            )
          })}
        </div>
      </ContainerComponent>
      <ContainerComponent>
        <div className={s.videos}>
          <div 
            onClick={() => videoClick(videosMap.first)}
            className={s.vid}>
            <div className={s.youtube}>
            {!ids[videosMap.first] && <div className={s.play_button}></div>}
              {ids[videosMap.first] && <YouTube 
                videoId={videosMap.first}
                opts={opts} 
              />}
              {!ids[videosMap.first] && <h2>Nicky Henderson Stable Tour</h2>}
            </div>
          </div>
          <div 
            onClick={() => videoClick(videosMap.second)}
            className={s.vid}>
            <div className={s.youtube}>
            {!ids[videosMap.second] && <div className={s.play_button}></div>}
              {ids[videosMap.second] && <YouTube 
                videoId={videosMap.second}
                opts={opts} 
              />}
              {!ids[videosMap.second] && <h2>Nicky Henderson Stable Tour</h2>}
            </div>
          </div>
        </div>
      </ContainerComponent>

      <ContainerComponent>
        <SectionTitle title="Cheltenham Festival" />
        <div className={s.article_container}>
          {tours.slice(3,6).map(tour => {
            return (
              <div key={tour.slug} className={s.news_slider_item}>
                <div className={s.news_img}>
                  <img src={random()} />
                </div>
                <div className={s.news_copy}>
                  <h3>{tour.acf.title}</h3>
                  <h4>{tour.acf.subtitle}</h4>
                  <Link to={`/stable-tours/${tour.slug}/`}>Read more</Link>
                </div>
              </div>
            )
          })}
        </div>
      </ContainerComponent>
      <ContainerComponent>
      <div className={s.videos}>
          <div 
            onClick={() => videoClick(videosMap.third)}
            className={s.vid}>
            <div className={s.youtube}>
            {!ids[videosMap.third] && <div className={s.play_button}></div>}
              {ids[videosMap.third] && <YouTube 
                videoId={videosMap.third}
                opts={opts} 
              />}
              {!ids[videosMap.third] && <h2>Nicky Henderson Stable Tour</h2>}
            </div>
          </div>
          <div 
            onClick={() => videoClick(videosMap.forth)}
            className={s.vid}>
            <div className={s.youtube}>
            {!ids[videosMap.forth] && <div className={s.play_button}></div>}
              {ids[videosMap.forth] && <YouTube 
                videoId={videosMap.forth}
                opts={opts} 
              />}
              {!ids[videosMap.forth] && <h2>Nicky Henderson Stable Tour</h2>}
            </div>
          </div>
        </div>
      </ContainerComponent>
    </Layout>
  )
}

export default StableTours;