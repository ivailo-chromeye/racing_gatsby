import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import "../styles/header.css";
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [w, setW] = useState(null);

  const wpdata = useStaticQuery(graphql`
    query WPMenus {
      wordpressWpApiMenusMenusItems {
        items {
          url
          order
          title
          wordpress_id
          object_slug
        }
      }
    }
  `)

  useEffect(() => {
    setW(window.innerWidth);
  }, []);

  useEffect(() => {
    function resizeFn() {
      setW(window.innerWidth)
    }

    window.addEventListener("resize", resizeFn)
    return () => window.removeEventListener("resize", resizeFn)
  })

  const menus = wpdata.wordpressWpApiMenusMenusItems.items

  function showMenuFn() {
    console.log("click")
    setShowMenu(!showMenu)
  }

  function whenToShowMenuFn() {
    if(!w) return null; // if for some reason w is not a number

    if(w > 1024) { // always show if above 1024
      return true;
    }

    if(w < 1024 && showMenu) { // show if toggled and if below 1024
      return true;
    }
    
    return false;
  }
  
  const doWeShowMenu = whenToShowMenuFn();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-wrap">
            <AniLink 
              fade
              duration={1}
              to="/">
              <img
                alt=""
                src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/logo.svg"
              />
            </AniLink>
          </div>

          { doWeShowMenu && (
            <div className="head-menu">
              <ul>
                {menus.map(item => {
                  let slug = item.object_slug;
                  return (
                    <li key={item.wordpress_id}>
                      <AniLink
                        fade
                        duration={1} 
                        activeStyle={{
                          color: "var(--btn_red)",
                        }}
                        to={slug !== 'home' ? slug : ''}>{item.title}
                      </AniLink>
                    </li>
                  )
                  }
              )
            }
              </ul>
            </div>
           ) } 

          <div className="menu-trigger" onClick={showMenuFn}>
            <span />
            <span />
            <span />
          </div>
        </div>

      </header>


    </>
  )
}

export default Header