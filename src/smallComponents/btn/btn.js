import React from "react"
import s from "./style.module.css"
import { Link } from "gatsby"

const Anchor = props => {
  return (
    <a target="_blank" href={props.cta_url} {...props}>{props.children}</a>
  )
}

const GatsbyLink = props => {
  return (
    <Link 
      className={s.freeBetsButton}
      style={{
        background: `var(--${props.background})`,
      }}
      to={props.cta_url}>{props.children}</Link>
  )
}

const DivAndAnchor = props => {
  return (
    <div
      className={s.view_racecard}
    >
      <a
        href={props.cta_url}
        >{props.children}</a>
    </div>
  )
}

const Btn = props => {
  let Element;
  if(props.type === "a") {
    Element = Anchor;
  } else if (props.type === "link") {
    Element = GatsbyLink
  } else if (props.type === "black") {
    Element = DivAndAnchor
  }

  return (
    <Element 
      {...props}
      >
        {props.children}
    </Element>
  )
}

export default Btn
