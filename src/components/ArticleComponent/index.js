import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

import st from './styles.module.scss';

const ArticleComponent = (props) => {
    return (
        <div style={props.applyStyles} className={st.article}>
            <LazyLoadImage alt={'img'} src={props.image.source_url}/>
            {/* <img src={props.image.source_url}/> */}
            <div>
                <h3>{props.title}</h3>
                <h4>{props.subtitle}</h4>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default ArticleComponent
