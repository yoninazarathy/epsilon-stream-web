import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ video }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{video.ourTitle}</h3>
    <p>{video.provider}</p>
    <p>{video.youtubeVideoId}</p>
  </div>
))
