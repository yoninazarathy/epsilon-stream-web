
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ snippets }) => (
  <div>
    <h1>Snippets:</h1>
    <br />
    All Snippets:
    <ul>
      {snippets.map(snippet => (
        <li key={snippet.hashTags[0]}>
          <Link to={`/snippets/${snippet.hashTags[0].substring(1)}`}>{snippet.ourTitle} ({snippet.hashTags[0]})</Link>
        </li>
      ))}
    </ul>
  </div>
))
