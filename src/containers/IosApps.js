import React from 'react'
import { withRouteData, Link } from 'react-static'
import SnippetPage from './constructed/SnippetPage';
//

export default withRouteData(({ iosApps }) => (
  <div>
    <h1>iOS Apps:</h1>
    <br />
    <ul>
      {iosApps.map(post => (
        <li key={post.urlOfItem}>
          <a href={post.urlOfItem}> {post.urlOfItem}</a>
        </li>
      ))}
    </ul>



  </div>
))
