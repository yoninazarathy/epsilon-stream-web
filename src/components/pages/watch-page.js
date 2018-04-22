import React, { Component } from 'react';
import {connect} from 'react-redux'
import EpsilonStreamPage from './epsilon-stream-page.js';
import YouTube from 'react-youtube';
import querystring from 'query-string';

import {store} from '../../store.js'

class WatchPage extends Component {
  constructor(props) {
    super(props);
    this.checkTime = this.checkTime.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  checkTime() {
    store.dispatch({
      type: "USER_PLAYER_AT",
      payload: {
        videoId: this.player.getVideoData()['video_id'],
        currentTime: this.player.getCurrentTime(),
        totalTime: this.player.getDuration()
      }
    });
    setTimeout(this.checkTime, 5000);
  }

  onReady(e) {
    console.log("player ready")
    this.player = e.target;
    let videoId = this.player.getVideoData()['video_id'];
    let progress = store.getState().user.videoProgressDict[videoId];
    store.dispatch({
      type: "USER_PLAYER_READY",
      payload: {
        videoId: videoId,
        currentTime: this.player.getCurrentTime(),
        totalTime: this.player.getDuration()
      }
    });
    this.player.seekTo(progress, true);
    this.checkTime();
  }

  onPlay(e) {
    console.log("player started")
    this.player = e.target;
    store.dispatch({
      type: "USER_PLAYER_PLAY",
      payload: {
        videoId: this.player.getVideoData()['video_id'],
        currentTime: this.player.getCurrentTime(),
        totalTime: this.player.getDuration()
      }
    });
  }

  onPause(e) {
    console.log("player paused")
    this.player = e.target;
    store.dispatch({
      type: "USER_PLAYER_PAUSE",
      payload: {
        videoId: this.player.getVideoData()['video_id'],
        currentTime: this.player.getCurrentTime(),
        totalTime: this.player.getDuration()
      }
    });
  }

  onEnd(e) {
    console.log("player ended")
    this.player = e.target;
    store.dispatch({
      type: "USER_PLAYER_END",
      payload: {
        videoId: this.player.getVideoData()['video_id'],
        currentTime: this.player.getCurrentTime(),
        totalTime: this.player.getDuration()
      }
    });
  }

  render() {
    let qry = this.props.location.search;
    let parsed = querystring.parse(qry);
    var videoId = ""
    //var userId = ""
    if ("v" in parsed) {
      videoId = parsed.v
    } else {
      console.log("no video")
    }
    if ("id in parsed") {
      //userId = parsed.id
    }
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        color: 'white'
      }
    };

    return (
        <EpsilonStreamPage title="Watch" hassearch={true}>
          <YouTube
          className="youtube-player"
          id="youtube-player"
          videoId={videoId}
          opts={opts}
          onReady={this.onReady}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnd={this.onEnd}
          />
        {/*<p> VideoId: {videoId}, UserId: {userId} </p>*/}
      </EpsilonStreamPage>
    );
  }
}

export default connect()(WatchPage);
export {WatchPage}
