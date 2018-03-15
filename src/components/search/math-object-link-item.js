import React, { Component } from 'react';
import {SearchItem} from './search-item.js'

class MathObjectLinkItem extends React.Component{
    render(){
      return(
          <SearchItem searchType = 'SEARCHLINK'
                      image={this.props.image}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      link={this.props.link}
                      hasprogressbar={false}
                      action={this.props.action}>
          </SearchItem>
      )
    }
  }
  
  export default MathObjectLinkItem;




