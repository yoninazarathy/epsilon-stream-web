import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ snippet }) => (
  <div>
        <Link to="/snippets/">{'<'} Back</Link>
    <h2> {snippet.ourTitle}</h2>
    <p> {snippet.body}</p>
  </div>
))
