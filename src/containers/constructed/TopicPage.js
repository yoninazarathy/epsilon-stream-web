import React, { Component } from 'react';
import EpsilonStreamPage from '../../components/pages/epsilon-stream-page';
import SearchResults from '../../components/search/search-results';

import { withRouteData } from 'react-static'


class TopicPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <EpsilonStreamPage title="Topic" hassearch={true}>
            {/*<SearchBar startQuery={this.state.parsedQuery}/>*/}
            {/*<SearchResults searchItem={this.props.topic} />*/}
            <p> Topic page.</p>
        </EpsilonStreamPage>
    );
  }
}


export default withRouteData(TopicPage);
