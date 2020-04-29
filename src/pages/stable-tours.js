import React from 'react';
import Layout from '../components/layout';
import BlackBtn from '../smallComponents/blackBtn'
import RedBtn from '../smallComponents/redBtn/redBtn';

const StableTours = () => {
  return (
    <Layout>
      <BlackBtn>odds..</BlackBtn>
      <RedBtn cta_url={'http://google.com'}>I'm using red button</RedBtn>
    </Layout>
  )
}

export default StableTours;