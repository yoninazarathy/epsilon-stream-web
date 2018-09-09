import React from 'react'
import { withRouteData, Link } from 'react-static'
import EpsilonStreamPage from '../../new-components/pages/epsilon-stream-page';
import YouTube from 'react-youtube';



export default withRouteData(({ video }) => (
  <EpsilonStreamPage title="Snippet" hassearch={true}>
    <br />
    <h3>{video.ourTitle}</h3>
    <p>{video.provider}</p>
    <p>{video.youtubeVideoId}</p>

      <YouTube
          className="youtube-player"
          id="youtube-player"
          videoId={video.youtubeVideoId}
      />
    </EpsilonStreamPage>
))

          /*opts={opts}
          onReady={this.onReady}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnd={this.onEnd}
          */