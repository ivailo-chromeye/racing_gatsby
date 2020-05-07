import React from 'react';
import Layout from '../components/layout';
import Container from '../smallComponents/container';
import PageHeadline from '../components/pageHeadline';
import s from '../styles/singleStableTour.module.css';

let image = 'https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200211154514/warren-greatrex-1.jpeg';

const StableTour = props => {
  const tour = props.pageContext.tour.acf;
  console.log(tour);

  return (
    <Layout>
      <PageHeadline 
        title={tour.title}
        subtitle={tour.subtitle}
      />
      <Container>
        <div className={s.article_wrap}>
          <div className={s.image_container}>
            <img 
              src="https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200211154514/warren-greatrex-1.jpeg" />
            <p>{tour.image_credit}</p>
            <div>
              <h3 className={s.subtitle}>{tour.subtitle}</h3>
            </div>
          </div>
          <div 
            dangerouslySetInnerHTML={{__html: tour.description}}
            className={s.text_container}></div>
          <div 
            dangerouslySetInnerHTML={{__html: tour.tours_text}} 
            className={s.text_container_tours_text}></div>
        </div>
      </Container>
    </Layout>
   )
}

export default StableTour