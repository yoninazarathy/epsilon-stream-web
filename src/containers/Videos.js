
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ videos }) => (
  <div>
    <h1>Videos:</h1>
    <br />
    All Videos:
    <ul>
      {videos.map(video => (
        <li key={video.youtubeVideoId}>
          <Link to={`/video/${video.youtubeVideoId}`}>{video.ourTitle} ({video.hashTags[0]})</Link>
        </li>
      ))}
    </ul>
  </div>
))
