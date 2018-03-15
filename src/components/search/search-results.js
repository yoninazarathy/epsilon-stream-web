import React, { Component } from 'react';

import WatchSearchItem from './watch-search-item.js'
import PlaySearchItem from './play-search-item.js'
import ExploreSearchItem from './explore-search-item.js'
import MathObjectLinkItem from './math-object-link-item.js'
import userWatchAction from '../../actions/user-watch-action';
import userPlayAction from '../../actions/user-play-action';
import userExploreAction from '../../actions/user-explore-action';
import userLinkAction from '../../actions/user-link-action';

import {connect} from 'react-redux'



class SearchResults extends Component {
  render(){
    function getItem(item, i) {
      switch (item.type) {
        case "FeaturedURL":
          return(
          <ExploreSearchItem key={i}
          type={item.type}
          title={item.title}
          image={item.image}
          subtitle={item.subtitle}
          link={item.link}
          action={()=>{userExploreAction(item.link)} }
          />
          );
          break;
        case "Video":
        return(
          <WatchSearchItem key={i}
          type={item.type}
          title={item.title}
          image={item.image}
          subtitle={item.subtitle}
          link={item.link}
          action={userWatchAction}
          completed={item.completed}
          />
        );
        case "MathObjectLinks":
        return(
          <MathObjectLinkItem key={i}
          type={item.type}
          title={item.title}
          image={item.image}
          subtitle={item.subtitle}
          link={item.link}
          action={() => {userLinkAction(item.title)}}
          completed={item.completed}
          />
        );

        default:
      }
    }

    // console.log(this.props.displaySearchResults)
    return(
        <div className="SearchResults">
            {this.props.displaySearchResults.map(getItem)}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      search: state.user.cleanSearchString,
      displaySearchResults: state.user.displaySearchResults
    };
  };



export default connect(mapStateToProps)(SearchResults);
export {SearchResults}
