import React, { Component } from 'react'
import { withRouteData, Link } from 'react-static'
import EpsilonStreamPage from '../../components/pages/epsilon-stream-page';
import YouTube from 'react-youtube';
import {Helmet} from 'react-helmet'
import {ourStore} from '../../redux/store'

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.checkTime = this.checkTime.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  componentWillMount() {
    ourStore.dispatch({type: "SET_PAGE_TITLE", payload: "Epsilon Stream"})
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  checkTime() {
    if (this._mounted) {
      ourStore.dispatch({
        type: "USER_PLAYER_AT",
        payload: {
          videoId: this.player.getVideoData()['video_id'],
          currentTime: this.player.getCurrentTime(),
          totalTime: this.player.getDuration()
        }
      });
      setTimeout(this.checkTime, 5000);
    }
  }

  onReady(e) {
    console.log("player ready")
    this.player = e.target;
    let videoId = this.player.getVideoData()['video_id'];
    let progress = ourStore.getState().user.videoProgressDict[videoId];
    ourStore.dispatch({
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
    ourStore.dispatch({
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
    ourStore.dispatch({
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
    ourStore.dispatch({
      type: "USER_PLAYER_END",
      payload: {
        videoId: this.player.getVideoData()['video_id'],
        currentTime: this.player.getCurrentTime(),
        totalTime: this.player.getDuration()
      }
    });
  }
  
  render() {
    var videoId = this.props.video.youtubeVideoId;
    var title = this.props.video.ourTitle
    var imageURL = 'https://i.ytimg.com/vi/'+videoId+'/mqdefault.jpg'

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
      <div>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:description" content={"Video "+"with "+"Epsilon Stream"} />
          <meta property="og:title" content={title + " on Epsilon Stream"} />
          <meta property="og:image" content={imageURL} />
          {/*<meta property="og:url" content="https://epsilonstream.com" />*/}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content={"Video "+" @ "+"Epsilon Stream"} />
          <meta name="twitter:image:alt" content="Watch, Play and Explore Mathematics." />
          <meta name="twitter:site" content="@OneOnEpsilon" />
          <title> {"Video "+" with "+"Epsilon Stream"} </title>
        </Helmet>
        <EpsilonStreamPage 
            title="Watch" 
            hassearch={true} 
            needsDB={false} 
            searchBarReplacementString={this.props.video.ourTitle}
            history={this.props.history}
            >
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
        </EpsilonStreamPage>
      </div>
    );
  }
}

export default withRouteData(VideoPage);