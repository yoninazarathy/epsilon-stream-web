import React from 'react';
import {SearchItem} from './search-item.js'
import {youtubeIdToEpsilonID} from '../../redux/managers/video-manager'

class WatchSearchItem extends React.Component{
  render(){
    return(
        <SearchItem searchType='WATCH'
                    type={this.props.type}
                    image={this.props.image}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    link={this.props.link}
                    action={this.props.action}
                    hasprogressbar={true}
                    completed={this.props.completed}
                    shareURL={"https://epsilonstream.com/video/"+encodeURIComponent(youtubeIdToEpsilonID(this.props.link))}>
        </SearchItem>
    )
  }
}

export default WatchSearchItem;