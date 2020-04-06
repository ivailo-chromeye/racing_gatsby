import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import "../styles/header.css";


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

  function whenToShowMenu() {
    if(!w) return null;
    if (w > 1024) {
      return true
    }
    if (w <= 1024 && showMenu) {
      return true
    }
    return false
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-wrap">
            <Link to="/">
              <img
                alt=""
                src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/logo.svg"
              />
            </Link>
          </div>

          { whenToShowMenu() ? (
            <div className="head-menu">
              <ul>
                {menus.map(item => {
                  let slug = item.object_slug;
                  return (
                    <li key={item.wordpress_id}>
                      <Link to={slug !== 'home' ? slug : ''}>{item.title}</Link>
                    </li>
                  )
                  }
              )
            }
              </ul>
            </div>
           ) : null} 

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