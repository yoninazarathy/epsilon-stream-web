import React, { Component } from 'react';
import EpsilonStreamPage from '../../components/pages/epsilon-stream-page';
import {SearchResults} from '../../components/search/search-results';
import {withRouteData } from 'react-static'
import {ourStore} from '../../redux/store'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.loadAction = this.loadAction.bind(this)
    this.state = {
      loaded: false,
    };
  }

  loadAction(){
    //console.log("topic load action")
    if(!this.state.loaded){
      ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: '#'+this.props.topic.name}})
      ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
      ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})
    }
    this.setState({
      loaded: true
    });
  }

  render() {
    return (
      <div onLoad = {this.loadAction}>
          <Helmet>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:description" content={this.props.topic.name+" with "+"Epsilon Stream"} />
            <meta property="og:title" content="Epsilon Stream Platform" />
            <meta property="og:image" content="https://es-app.com/assets/935xva.jpg" />
            <meta property="og:url" content="https://epsilonstream.com" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content={this.props.topic.name+" @ "+"Epsilon Stream"} />
            <meta name="twitter:image:alt" content="Watch, Play and Explore Mathematics." />
            <meta name="twitter:site" content="@OneOnEpsilon" />
            <title> {this.props.topic.name+" with "+"Epsilon Stream"} </title>
          </Helmet>
          <EpsilonStreamPage title="Topic" hassearch={true}>
              {this.props.appLoaded ? <SearchResults searchItem={this.props.topic}/> : "not"}
          </EpsilonStreamPage>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appLoaded: state.user.appLoaded,
  };
};

export default withRouteData(connect(mapStateToProps)(TopicPage));