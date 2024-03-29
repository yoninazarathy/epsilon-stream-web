import React from 'react';
import {SearchItem} from './search-item.js'

class ExploreSearchItem extends React.Component{
    render(){
        return(
            <SearchItem searchType='EXPLORE'
                        type={this.props.type}
                        image={this.props.image}
                        title={this.props.title}
                        subtitle={this.props.subtitle}
                        link={this.props.link}
                        hasprogressbar={false}
                        action={this.props.action}
                        shareURL={this.props.link}>
            </SearchItem>
            )
    }
  }

  export default ExploreSearchItem;
