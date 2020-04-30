import React from "react"

import st from './styles.module.scss';

const ArticleComponent = (props) => {
    return (
        <div style={props.applyStyles} className={st.article}>
            <img src={props.image.source_url}/>
            <div>
                <h3>{props.title}</h3>
                <h4>{props.subtitle}</h4>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default ArticleComponent
