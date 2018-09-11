import React from 'react';
import {SearchItem} from './search-item.js'
import Icon from '../../assets/icon.png'

class NoMatchSearchItem extends React.Component{
    render(){
        return(
            <SearchItem searchType='NO-MATCH'
                      type={this.props.type}
                      image={Icon}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      link={this.props.link}
                      hasprogressbar={false}
                      noImage = {true}
                      action={this.props.action}>
            </SearchItem>
            )
    }
  }

  export default NoMatchSearchItem;
