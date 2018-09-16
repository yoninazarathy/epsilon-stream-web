import React from 'react'
import { withRouteData, Link } from 'react-static'
import SnippetPage from './constructed/SnippetPage';
//

export default withRouteData(({ news }) => (
  <div>
    <h1>One on Epsilon News:</h1>
    <br />
    <ul>
      {news.map(post => (
        <li key={post.urlOfItem}>
          <a href={post.urlOfItem}> {post.urlOfItem}</a>
        </li>
      ))}
    </ul>



  </div>
))
