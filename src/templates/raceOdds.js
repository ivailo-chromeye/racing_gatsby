import React from 'react';
import Layout from '../components/layout';
import PageHeadline from '../components/pageHeadline';
import Btn from '../smallComponents/btn/btn';
import SectionTitle from "../components/SectionTitle";
import GridLayout from '../components/GridLayout'

const RaceOdds = (props) => {
  const { race } = props.pageContext;
  // console.log(race);

  return (
    <Layout>
      <PageHeadline 
        title={race.title}
        subtitle={`Odds about ${race.title}`}
      />

      <SectionTitle title={"A title about odds."} />

      <GridLayout responsiveFull={1024} sideGap={128} equalHeight={true} bottomGap={0} responsiveBottomGap={0}>
        <Btn 
            cta_url={`/races/${race.raceid}/`}
            background="btn_red"
            type="link"
          >Back to Race
        </Btn>

        <div>this is testing GridLayout component. Works as intended</div>

        <Btn 
            cta_url={`/races/${race.raceid}/tips/`}
            background="btn_red"
            type="link"
          >Tips for this race
        </Btn>
      </GridLayout>



    </Layout>
   )
}

export default RaceOdds