import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/header.css"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [w, setW] = useState(window.innerWidth)

  const wpdata = useStaticQuery(graphql`
    query WPMenus {
      wordpressWpApiMenusMenusItems {
        items {
          url
          order
          title
          wordpress_id
        }
      }
    }
  `)

  useEffect(() => {
    function resizeFn() {
      setW(window.innerWidth)
    }

    window.addEventListener("resize", resizeFn)
    return () => window.removeEventListener("resize", resizeFn)
  })

  const menus = wpdata.wordpressWpApiMenusMenusItems.items

  const myRef = React.createRef()

  // function toggleMenu() {
  //   console.log("asd")
  //   if (myRef.current.style.display === "block") {
  //     myRef.current.style.display = "none"
  //   } else {
  //     myRef.current.style.display = "block"
  //   }
  // }

  function showMenuFn() {
    console.log("click")
    setShowMenu(!showMenu)
  }

  function whenToShowMenu() {
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
            <a href="/">
              <img
                alt=""
                src="https://www.racingpost.com/cheltenham-festival/wp-content/themes/Cheltenham/images/logo.svg"
              />
            </a>
          </div>

          {whenToShowMenu() ? (
            <div ref={myRef} className="head-menu">
              <ul>
                {menus.map(item => (
                  <li key={item.wordpress_id}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                ))}
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
