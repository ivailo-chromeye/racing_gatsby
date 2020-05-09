import React from 'react';
import Layout from '../components/layout';
import PageHeadline from '../components/pageHeadline';
import { graphql, useStaticQuery } from 'gatsby';
import s from '../styles/goldCupBetting.module.css';
import ContainerComponent from '../smallComponents/container'

const GoldCupBetting = () => {
  const data = useStaticQuery(graphql`
    {
      wordpressPage(slug: {eq: "gold-cup-betting"}) {
        id
        slug
        acf {
          copy_section_1
          copy_section_3
          copy_section_2
          copy_section_4
          title_section_1
          title_section_2
          title_section_3
          title_section_4
          title
          subtitle
        }
      }
    }
  `);

  const { acf } = data.wordpressPage;
  console.log(acf);


  return (
    <Layout>

    <PageHeadline 
        title={acf.title}
        subtitle={acf.subtitle}
    />

    <ContainerComponent>
      <div className={s.pod_block}>
        <div className={s.pod_img}>
          <div className={s.pod_copy}>
          <h4>{acf.title_section_1}</h4>
            <div className={s.coltext} dangerouslySetInnerHTML={{
              __html: acf.copy_section_1,
            }}></div>
          </div>
          <img src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/goldcup_img1_v1.jpg" />
        </div>
        <div className={s.pod_img}>
          <div className={s.pod_copy}>
          <h4>{acf.title_section_2}</h4>
            <div className={s.coltext} dangerouslySetInnerHTML={{
              __html: acf.copy_section_2,
            }}></div>
          </div>
          <img src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/goldcup_img1_v1.jpg" />
        </div>
        <div className={s.pod_img}>
          <div className={s.pod_copy}>
          <h4>{acf.title_section_3}</h4>
            <div className={s.coltext} dangerouslySetInnerHTML={{
              __html: acf.copy_section_3,
            }}></div>
          </div>
          <img src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/goldcup_img1_v1.jpg" />
        </div>
        <div className={s.pod_img}>
          <div className={s.pod_copy}>
          <h4>{acf.title_section_4}</h4>
            <div className={s.coltext} dangerouslySetInnerHTML={{
              __html: acf.copy_section_4,
            }}></div>
          </div>
          <img src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/goldcup_img1_v1.jpg" />
        </div>
      </div>
    </ContainerComponent>

    </Layout>
  )
}

export default GoldCupBetting;