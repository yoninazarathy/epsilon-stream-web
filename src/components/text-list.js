import React, { Component } from 'react';


class TextList extends React.Component{
  render(){
    return(
      <div className="TextList">
        <p> {this.props.type}({this.props.data.length}) </p>
        {/*<RefreshFromCloud actionType = {this.props.actionType}/>*/}
        <ul>
          {this.props.data.map((item,i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    )
  }
}

export default TextList;