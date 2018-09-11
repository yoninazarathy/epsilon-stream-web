import React from 'react'
import { withRouteData, Link } from 'react-static'

import EpsilonStreamPage from '../../new-components/pages/epsilon-stream-page';

export default withRouteData(({ post }) => (
  <EpsilonStreamPage title="Post" hassearch={true}>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
  </EpsilonStreamPage>
))
