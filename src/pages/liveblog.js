import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';
import LiveBlog from '../components/LiveBlog'

const LiveBlogPage = () => {
  return (
    <Layout>
      <LiveBlog />
    </Layout>
  )
}

export default LiveBlogPage;