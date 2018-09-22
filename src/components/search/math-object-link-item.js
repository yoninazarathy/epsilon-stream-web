import React from 'react';
import {SearchItem} from './search-item.js'

class MathObjectLinkItem extends React.Component{
    render(){
      return(
          <SearchItem searchType='SEARCHLINK'
                      type={this.props.type}
                      image={this.props.image}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      link={this.props.link}
                      hasprogressbar={false}
                      action={this.props.action}
                      shareURL={"https://epsilonstream.com/topic/"+encodeURIComponent(this.props.link)}>
          </SearchItem>
      )
    }
  }
  
  export default MathObjectLinkItem;




