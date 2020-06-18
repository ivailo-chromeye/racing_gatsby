import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./HeaderComponent/header"
import Footer from "./footer";

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
      <div className={`container ${isRace ? "white" : null}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
