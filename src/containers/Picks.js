import React from 'react'
import { withSiteData,Link } from 'react-static'
import TopicPage from './constructed/TopicPage'

export default withSiteData(() => (
  <TopicPage topic = {{name: "editorsPicks"}}/>
))