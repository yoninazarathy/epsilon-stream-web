import React, { Component } from 'react';
import EpsilonStreamPage from '../../components/pages/epsilon-stream-page';
import SearchResults from '../../components/search/search-results';

import { withRouteData } from 'react-static'

import {ourStore} from '../../redux/store'



class TopicPage extends Component {
  constructor(props){
    super(props);
    ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: '#'+this.props.topic.name}})
  }

  render() {
    return (
        <EpsilonStreamPage title="Topic" hassearch={true}>
            {/*<SearchBar startQuery={this.state.parsedQuery}/>*/}
            {/*<SearchResults searchItem={this.props.topic} />*/}
            <p> Topic page for {'#'+this.props.topic.name}.</p>
        </EpsilonStreamPage>
    );
  }
}


export default withRouteData(TopicPage);
