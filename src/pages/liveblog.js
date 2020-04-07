import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';
import s from '../styles/liveblog.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'timeago.js'
import { API } from '../helper/api';
import { timeSince } from '../helper/index';
import { liveBlog } from '../helper/graphqlHooks';
import Item from '../components/liveBlogItem';

const api = new API();

const LiveBlog = () => {
  const wpdata = liveBlog(); // graphql
  let { totalCount, nodes } = wpdata.allWordpressWpItem;
  let { options } = wpdata.wordpressAcfOptions;
  // end of graphql

  const [ page, setPage ] = useState(1);
  const [ newNodes, setNewNodes ] = useState({
    changed: false, 
    nodes: [],
    totalCount,
  });

  useEffect(() => {
    async function load() {
      await get();


      // if(!options.useinterval) return;
      // setInterval(() => get(), +options.intervalseconds * 1000);
      // setInterval(() => get(), 10 * 1000);
    }
    load();
  }, [])

  const get = async() => {
    let wpItems = await api.getItems();

    const wpApiLastID = wpItems.data[0].id;
    const initialNodesLastID = nodes[0].wordpress_id;

    if(newNodes.nodes.length > 0) {
      if(wpApiLastID === newNodes.nodes[0].wordpress_id) return;
    }
    if(wpApiLastID === initialNodesLastID) return



    setNewNodes({
      totalCount: totalCount + 1,
      changed: true,
      nodes: wpItems.data.map(item => {
        return ({
          acf: item.acf,
          wordpress_id: item.id,
          date: format((new Date(item.date)).addHours(1))
        })
      })
    });
  }

  const updateFn = () => {
    if(newNodes.changed) {
      setTimeout(() => {
        setNewNodes({
          ...newNodes,
          changed: false,
        })
      }, 5000)
      return "Updated - message that expires in 5 seconds";
    }
    return null;
  }

  let nodesToRender = () => {
    return newNodes.nodes.length === 0 ? nodes : newNodes.nodes
  };

  const end = page * +options.per_page;

  // render
  console.log('render');
  return (
    <Layout>
      <h2 style={{marginTop: 50}}>{updateFn()}</h2>
      <div className={s.info}>
        <span>WP post_type=item |</span>
        <span>Visible posts: {end > totalCount ? totalCount : end} | {nodesToRender().length} posts</span>
      </div>
      <div className={s.container}>
        <button onClick={get}>Get latest posts - later to be removed of course</button>
        <InfiniteScroll
          dataLength={end}
          next={() => setPage(page + 1)}
          hasMore={end > totalCount ? false : true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {nodesToRender().slice(0, end).map((node, i) => {
            return <Item key={i} node={node} />
          })} 
        </InfiniteScroll>
      </div>
    </Layout>
  );
}

export default LiveBlog;