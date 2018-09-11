import React, { Component } from 'react'
import { withRouteData, Link } from 'react-static'
import EpsilonStreamPage from '../../new-components/pages/epsilon-stream-page';
import YouTube from 'react-youtube';

class WatchPage extends Component {
  constructor(props) {
    super(props);
    this.checkTime = this.checkTime.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  checkTime() { console.log("checkTime"); }
  onReady() { console.log("onReady"); }
  onPlay() { console.log("onPlay"); }
  onPause() { console.log("onPause"); }
  onEnd() { console.log("onEnd"); }

  /*
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
  */

  render() {
    var videoId = this.props.video.youtubeVideoId;

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
        onReady={console.log("onReady")}
        onPlay={console.log("onPlay")}
        onPause={console.log("onPause")}
        onEnd={console.log("onEnd")}
        />
      </EpsilonStreamPage>
    );
  }
}

export default withRouteData(WatchPage);