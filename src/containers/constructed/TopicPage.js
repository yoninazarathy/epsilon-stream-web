import React, { Component } from 'react';
import EpsilonStreamPage from '../../components/pages/epsilon-stream-page';
import {SearchResults} from '../../components/search/search-results';
import {withRouteData} from 'react-static'
import {ourStore} from '../../redux/store'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {setCurrentTopic} from '../../redux/store'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    setCurrentTopic(this.props.topic.name) //set global current topic
  }

  componentWillMount(){
    console.log("i am here jacksonnnnnnn")
    if (typeof document !== 'undefined') {
      let hashTag = '#'+window.location.pathname.substring(7) //The 7 is for following '/topic/
      ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: hashTag}})
      ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
      ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})  
    }
  }

  render() {
    return (
      <div> 
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
          <EpsilonStreamPage 
              title="Topic" 
              hassearch={true} 
              needsDB={true}
              history={this.props.history}
              >
              {this.props.loaded && this.props.autoCompleteList.length === 0 ? <SearchResults searchItem={this.props.topic}/> : ""}
          </EpsilonStreamPage>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.database.dbIsReady,
    autoCompleteList: state.user.autoCompleteList,
  };
};

export default withRouteData(connect(mapStateToProps)(TopicPage));