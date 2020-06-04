import React from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import PageHeadline from '../components/pageHeadline';
import RacesBox from '../components/RacesBox';

const Betting = () => {

  const data = useStaticQuery(graphql`
    {
      allWordpressWpRace {
        nodes {
          slug
          acf {
            title
            raceid
            race_datetime
          }
        }
      }
      site {
        siteMetadata {
          raceDays {
            THURSDAY {
              active
              date
            }
            TUESDAY {
              active
              date
            }
            WEDNESDAY {
              active
              date
            }
            FRIDAY {
              date
              active
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <PageHeadline 
        title="CHELTENHAM BETTING" 
        subtitle="Racing Post’s stable tours provide a unique opportunity for behind-the-scenes access to some of the most famous yards in Britain and Ireland, providing in-depth insight into how the very best in the industry manage their illustrious runners. With esteemed trainers such as Willie Mullins, Gordon Elliott, Nicky Henderson and Paul Nicholls opening their doors to us, our Stable Tours provide you will all the inside knowledge you need to have a prosperous Cheltenham Festival." />

      <RacesBox 
        raceDays={data.site.siteMetadata.raceDays}
        races={data.allWordpressWpRace.nodes} />

    </Layout>
  )
}

export default Betting;