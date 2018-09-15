
import React from 'react'
import { withRouteData, Link } from 'react-static'
import SnippetPage from './constructed/SnippetPage';
//

export default withRouteData(({ curious }) => (
  <div>
    <h1>Curious Epsilon:</h1>
    <br />
    <ul>
      {curious.map(post => (
        <li key={post.urlOfItem}>
          <a href={post.urlOfItem}> {post.urlOfItem}</a>
        </li>
      ))}
    </ul>



  </div>
))
