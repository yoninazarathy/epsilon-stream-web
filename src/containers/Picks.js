import React from 'react'
import { withRouteData, Link } from 'react-static'

export default withRouteData(({ picks }) => (
  <div>
    <h1>Editors' Picks:</h1>
    <br />
    <ul>
      {picks.map(post => (
        <li key={post.urlOfItem}>
          <a href={post.urlOfItem}> {post.urlOfItem}</a>
        </li>
      ))}
    </ul>



  </div>
))
