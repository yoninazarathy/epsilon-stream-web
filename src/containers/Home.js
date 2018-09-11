import React from 'react'
import { withSiteData,Link } from 'react-static'
import EpsilonStreamPage from '../new-components/pages/epsilon-stream-page';

export default withSiteData(() => (
  <EpsilonStreamPage title="Snippet" hassearch={true}>
    <div>
      <h1 style={{ textAlign: 'center' }}>Epsilon Stream Web - Under Development</h1>
        <ul>
          <li><Link to={`/video`}>See all videos</Link> </li>
          <li><Link to={`/snippet`}>See all snippets</Link></li>
          <li><Link to={`/search`}>See all pregenerated math object thingimagis</Link></li>
        </ul>

    
    </div>
  </EpsilonStreamPage>
))
