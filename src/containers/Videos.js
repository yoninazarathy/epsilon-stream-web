import React from 'react'
import { withRouteData, Link } from 'react-static'
import {youtubeIdToEpsilonID} from '../redux/managers/video-manager'
//

export default withRouteData(({ videos }) => (
  <div>
    <h1>Videos:</h1>
    <br />
    All Videos:
    <ul>
      {videos.map(video => (
        <li key={video.youtubeVideoId}>
          <Link to={`/video/${youtubeIdToEpsilonID(video.youtubeVideoId)}`}>{video.ourTitle} ({video.hashTags[0]})</Link>
        </li>
      ))}
    </ul>
  </div>
))
