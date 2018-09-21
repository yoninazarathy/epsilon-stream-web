import React, { Component } from 'react';

import WatchSearchItem from './watch-search-item.js'
//import PlaySearchItem from './play-search-item.js'
import ExploreSearchItem from './explore-search-item.js'
import MathObjectLinkItem from './math-object-link-item.js'
import SnippetSearchItem from './snippet-search-item.js'
import NoMatchSearchItem from './no-match-search-item.js'
// import userWatchAction from '../../actions/user-watch-action';
// import userSnippetAction from '../../actions/user-snippet-action';

//import userPlayAction from '../../actions/user-play-action';
// import userExploreAction from '../../actions/user-explore-action';
// import userLinkAction from '../../actions/user-link-action';
import { Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { ourStore } from '../../redux/store'
import {connect} from 'react-redux'
import {youtubeIdToEpsilonID} from '../../redux/managers/video-manager'
import Icon from '../../assets/icon.png'


class SearchResultsX extends Component {
  constructor(props) {
    super(props);

    this.getItem = this.getItem.bind(this);
    this.action = this.action.bind(this);
  }

  action(type, name, history) {
    return (name, history) => {
      if (type === "NO-MATCH") {
        window.open("https://oneonepsilon.com/contact", '_blank')
      } else if (type === "EpsilonSnippet") {
        history.push("/snippet/" + name.toLowerCase())
      } else if (type === "FeaturedURL") {
        window.open(name)
      } else if (type === "Video") {
        history.push("/video/" + youtubeIdToEpsilonID(name))
      } else if (type === "MathObjectLinks") {
        history.push("/topic/" + ourStore.getState().database.hashTagDict[name].substring(1).toLowerCase())
      }
    }
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
          action={this.action("NO-MATCH")}
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
          hashTag={this.props.hashTag}
          action={this.action("EpsilonSnippet")}
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
          action={this.action("FeaturedURL")}
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
          action={this.action("Video")}
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
          action={this.action("MathObjectLinks")}
          completed={item.completed}
          />
        );
      default:
    }
  }

  render(){
    return(
        <div className="SearchResults">
          <div>
            {this.props.displaySearchResults.map(this.getItem)}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.user.cleanSearchString,
    hashTag: state.user.currentHashTag,
    displaySearchResults: state.user.displaySearchResults,
  };
};

const SearchResults = connect(mapStateToProps)(SearchResultsX);
export {SearchResults}
