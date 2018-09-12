
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ topics }) => (
  <div>
    <h1>Search items:</h1>
    <ul>
      {topics.map(topic => (
        <li key={topic.item}>
          <Link to={`/topic/${topic.item}`}>{topic.item}</Link>
        </li>
      ))}
    </ul>
  </div>
))
