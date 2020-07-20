import React from 'react';
import s from "./style.module.css";
import CollapseComponent from "../../CollapseComponent";
import FreeBets from "../../FreeBets/FreeBetsShortform";

const imgBaseURL = "https://rp.chromeye.com/royal-ascot/wp-content/themes/RoyalAscot/images";


// plus plus_white
// expand expand_white


const Offers = ({ title }) => {
  return (
    <div>
      <CollapseComponent
        color="#fff"
        backgroundColor="var(--bet365-green)"
        label={`bet365 OFFERS - ${title}`}
        activeImage={`${imgBaseURL}/plus_white.png`}
        inactiveImage={`${imgBaseURL}/expand_white.png`}
      >
        <FreeBets />
      </CollapseComponent>

      <CollapseComponent
        color="var(--black)"
        backgroundColor="var(--yellow_active_filter)"
        label={`TOP OFFERS - ${title}`}
        activeImage={`${imgBaseURL}/plus.png`}
        inactiveImage={`${imgBaseURL}/expand.png`}
      >
        <FreeBets />
      </CollapseComponent>

    </div>
  )
}

export default Offers;