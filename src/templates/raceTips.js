import React from 'react';
import Layout from '../components/layout';
import PageHeadline from '../components/pageHeadline'
import Btn from '../smallComponents/btn/btn';
import SectionTitle from "../components/SectionTitle";
import GridLayout from '../components/GridLayout'

const RaceTips = (props) => {
  const { race } = props.pageContext;
  // console.log(race);

  return (
    <Layout>
      <PageHeadline 
        title={race.title}
        subtitle={`Tips about ${race.title}`}
      />

      <SectionTitle 
        backgroundColor={"var(--pink)"}
        title={"A title about tips."} />

      <GridLayout responsiveFull={1024} sideGap={12} equalHeight={true} bottomGap={0} responsiveBottomGap={0}>
        <Btn 
            cta_url={`/races/${race.raceid}/`}
            background="btn_red"
            type="link"
          >Back to Race
        </Btn>

        <div>Testing GridLayout component. Works as intended. Also passing props to SectionTitle component</div>

        <Btn 
            cta_url={`/races/${race.raceid}/odds/`}
            background="btn_red"
            type="link"
          >Odds
        </Btn>
      </GridLayout>

    </Layout>
   )
}

export default RaceTips