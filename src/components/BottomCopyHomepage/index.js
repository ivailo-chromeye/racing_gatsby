import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"

import s from './styles.module.scss';

const BottomCopyHomepage = () => {
    const pageData = useStaticQuery(graphql`
        query BottomCopyHome {
            wordpressPage(wordpress_id: {eq: 276}) {
                id
                slug
                title
                wordpress_id
                acf {
                  bottom_textbox_title
                  bottom_textbox_copy
                }
            }
        }   
    `)
    
    const article = {
        'title': pageData.wordpressPage.acf.bottom_textbox_title,
        'text': pageData.wordpressPage.acf.bottom_textbox_copy
    }

    return (
        <div className={s.bottomCopy}>
            <h2>{article.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: article.text }}></div>
		</div>
    )
}

export default BottomCopyHomepage
