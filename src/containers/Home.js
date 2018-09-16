import React from 'react'
import { withSiteData,Link } from 'react-static'
import EpsilonStreamPage from '../components/pages/epsilon-stream-page';

export default withSiteData(() => (
  <EpsilonStreamPage title="Snippet" hassearch={true}>
    <div>
      <h1 style={{ textAlign: 'center' }}>Epsilon Stream Web - Under Development</h1>
        <ul>
          <li> <a href="https://epsiloncoach.com"> Use V0.5 of Epsilon Stream</a> </li>
          <li><Link to={`/video`}>See all videos</Link> </li>
          <li><Link to={`/snippet`}>See all snippets</Link></li>
          <li><Link to={`/topic`}>See all topics</Link></li>
        </ul>

    
    </div>
  </EpsilonStreamPage>
))
