import React from 'react';
import s from '../styles/footer.module.css'

const elements = [
  {
    href: "https://www.facebook.com/racingpost",
    className: "fb",
    text: "facebook",
    backgroundPosition: ""
  },
  {
    href: "https://www.twitter.com/racingpost",
    className: "tw",
    text: "twitter",
    backgroundPosition: "0 78.5em"
  },
  {
    href: "https://www.youtube.com/user/racingpostdotcom",
    className: "yt",
    text: "soc",
    backgroundPosition: "0 72em"
  },
  {
    href: "https://www.instagram.com/racingpost",
    className: "in",
    text: "instagram",
    backgroundPosition: "0 65.5em"
  },
  {
    href: "https://www.racingpost.com/whatsapp",
    className: "wu",
    text: "whatsapp",
    backgroundPosition: "0 16.6em"
  },
  {
    href: "http://m.me/racingpost",
    className: "ms",
    text: "messenger",
    backgroundPosition: "0px 10.1em"
  },
];

const Footer = () => {
  return (
    <footer>
      <div className={s.container}>
        <a href="https://www.racingpost.com/sport/">
          <img
            className={s.img}
            src="https://rp.chromeye.com/cheltenham-festival/wp-content/themes/Cheltenham/images/rp_logo.svg" />
        </a>

        <div className={s.social_area}>
          {elements.map((el, i) => (
            <a 
              key={i}
              style={{
                backgroundPosition: el.backgroundPosition,
              }}
              href={el.href}
              className={el.className}
              target="_blank">
                {el.text}
            </a>
          ))}
        </div>

        <div className={s.responsible}>
          <p></p>
          <h4>Racing Post backs responsible gambling.</h4>
        </div>

        <div className={s.footer_menu}>
          <a href="https://www.raig.org/" target="_blank">RAIG</a>
          <a href="http://www.gambleaware.co.uk/" target="_blank">Gambleaware</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;