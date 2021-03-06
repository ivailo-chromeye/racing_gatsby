import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import "./header.css";
import Dropdown from "./dropdown";



const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [w, setW] = useState(null);
  const [dropdown, setDropdown] = useState({
    toggled: false,
    item: null,
  });

  const wpdata = useStaticQuery(graphql`
    {
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

  function hover(item, toggled) { // enter is 
    if(!item) return
    if(!item.wordpress_children) return;

    setDropdown(prevState => ({
      ...prevState,
      toggled,
      item,
    }));
  }

  function renderDropdown(item) {
    return item.wordpress_children.map(link => {
      // console.log(link);
      return (
        <Link
          partiallyActive={true}
          activeStyle={{color: 'red'}}
          key={link.wordpress_id}
          to={`/stable-tours/${link.object_slug}/`}
        > 
          {link.title}
        </Link>
      )
    })
  }
  
  const doWeShowMenu = whenToShowMenuFn();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-wrap">
            <Link 
              
              duration={0.7}
              to="/">
              <img
                alt=""
                src="https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/5/20200605144223/royal_logo_v3.svg"
              />
            </Link>
          </div>

          { doWeShowMenu && (
            <>
              <div className="head-menu">
                <ul>
                  {menus.map(item => {
                    let slug = item.object_slug;
                    return (
                      <li 
                        // onMouseEnter={() => hover(item, true)}
                        // onMouseLeave={() => hover(item, false)}
                        key={item.wordpress_id}>
                        <Link
                          partiallyActive={slug === 'home' ? false : true}
                          duration={0.7} 
                          activeStyle={{
                            color: "var(--btn_red)",
                          }}
                          to={slug !== 'home' ? slug : ''}>{item.title}
                        </Link>
                      </li>
                    )
                    }
                )
              }
                </ul>
              </div>
            </>
           ) } 

          
          {dropdown.toggled && <Dropdown 
            hover={hover}
            item={dropdown.item}>
              {renderDropdown(dropdown.item)}
          </Dropdown>}

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

export default Header;