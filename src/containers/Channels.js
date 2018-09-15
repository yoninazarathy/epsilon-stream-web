import React from 'react'
import { withRouteData, Link } from 'react-static'
import SnippetPage from './constructed/SnippetPage';
//

export default withRouteData(({ channels }) => (
  <div>
    <h1>Youtube Channels:</h1>
    <br />
    <ul>
      {channels.map(post => (
        <li key={post.urlOfItem}>
          <a href={post.urlOfItem}> {post.urlOfItem}</a>
        </li>
      ))}
    </ul>



  </div>
))
