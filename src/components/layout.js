import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, withPrefix } from "gatsby"

import Header from "./HeaderComponent/header"
import Footer from "./footer";
import { Helmet } from "react-helmet";

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

const Layout = ({ children }) => {
  const [isRace, setIsRace] = useState(false);

  useEffect(() => {
    if(window) {
      const location = window.location.href;
      if(location.indexOf("/races/") > -1) {
        setIsRace(true);
      }
    }
  }, []);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // console.log({component: 'layout', isRace});

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Helmet>
        <script src={withPrefix('diffusion.js')}></script>
        <script src={withPrefix('custom.js')}></script>
        <script src="https://www.racingpost.com/royal-ascot/wp-content/themes/RoyalAscot/js/diffusion.js"></script>
        <script>
          window.diffusion = diffusion;
        </script>
      </Helmet>
      <div className={`container ${isRace ? "white" : null}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
