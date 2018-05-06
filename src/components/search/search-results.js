import React, { Component } from 'react';

import WatchSearchItem from './watch-search-item.js'
//import PlaySearchItem from './play-search-item.js'
import ExploreSearchItem from './explore-search-item.js'
import MathObjectLinkItem from './math-object-link-item.js'
import SnippetSearchItem from './snippet-search-item.js'
import NoMatchSearchItem from './no-match-search-item.js'
import userWatchAction from '../../actions/user-watch-action';
import userSnippetAction from '../../actions/user-snippet-action';

//import userPlayAction from '../../actions/user-play-action';
import userExploreAction from '../../actions/user-explore-action';
import userLinkAction from '../../actions/user-link-action';
import { Alert } from 'reactstrap';

import {connect} from 'react-redux'

import Icon from '../../assets/icon.png'


class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.getItem = this.getItem.bind(this);
  }

   getItem(item, i) {
    switch (item.type) {
      case "NO-MATCH":
        return(
        <NoMatchSearchItem
          key={i}
          type={item.type}
          title={item.title}
          image={Icon}
          subtitle={"Contact our team"}
          link={null}
          action={() => {window.open("https://oneonepsilon.com/contact", '_blank')} } 
        />
        );
      case "EpsilonSnippet":
        return(
        <SnippetSearchItem
          key={i}
          type={item.type}
          title={item.title}
          image={null}
          subtitle={null}
          link={null}
          hashTag = {this.props.hashTag}
          action={userSnippetAction} 
        />
        );
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
          action={() => {userLinkAction(item.link)}}
          completed={item.completed}
          />
        );
      default:
    }
  }

  render(){
    return(
        <div className="SearchResults">
            {this.props.displaySearchResults.map(this.getItem)}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      search: state.user.cleanSearchString,
      hashTag: state.user.currentHashTag,
      displaySearchResults: state.user.displaySearchResults
    };
  };



export default connect(mapStateToProps)(SearchResults);
export {SearchResults}
