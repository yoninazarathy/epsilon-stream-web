
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ searchItems }) => (
  <div>
    <h1>Search items:</h1>
    <ul>
      {searchItems.map(searchItem => (
        <li key={searchItem.item}>
          <Link to={`/search/${searchItem.item}`}>{searchItem.item}</Link>
        </li>
      ))}
    </ul>
  </div>
))
