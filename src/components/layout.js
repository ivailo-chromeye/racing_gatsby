import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./HeaderComponent/header"
import Footer from "./footer";
import "./layout.css"

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

const Layout = ({ children }) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container">
        <main>{children}</main>
        
      </div>
      <Footer />
    </>
  )
}

export default Layout
