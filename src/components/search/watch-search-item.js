import React from 'react';
import {SearchItem} from './search-item.js'

class WatchSearchItem extends React.Component{
  render(){
    return(
        <SearchItem searchType = 'WATCH'
                    type={this.props.type}
                    image={this.props.image}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    link={this.props.link}
                    action={this.props.action}
                    hasprogressbar={true}
                    completed={this.props.completed}>
        </SearchItem>
    )
  }
}

export default WatchSearchItem;




