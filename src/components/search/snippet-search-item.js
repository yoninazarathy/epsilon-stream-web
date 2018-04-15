import React from 'react';
import {SearchItem} from './search-item.js'
import ReactMarkDown from 'react-markdown'

class SnippetSearchItem extends React.Component{
    render(){
        const input = '## This is a header\n\nAnd this is a paragraph'
        return(
            <div>
            <SearchItem searchType='EXPLORE'
                      type={this.props.type}
                      image={this.props.image}
                      title={input /*this.props.title*/}
                      subtitle={this.props.subtitle}
                      link={this.props.link}
                      hasprogressbar={false}
                      noImage = {true}
                      action={this.props.action}>
            </SearchItem>
            {/*<ReactMarkDown source={input} />*/}
            </div>
            )
    }
  }

  export default SnippetSearchItem;
