import React from 'react';

var md = require('markdown-it')({
  html: true}
  );
var mk = require('markdown-it-katex');
var mt = require('markdown-it-multimd-table');
md.use(mk);
md.use(mt);

export default class Blog extends React.Component{
  formattedMD: "" 

  render(){
    let rawMarkDown = this.props.rawMarkDown
    if(rawMarkDown !== undefined){
      this.formattedMD = md.render(rawMarkDown)
    }else{
      this.formattedMD = md.render("# There is blog file.")
    }
    return(
        <div dangerouslySetInnerHTML={{__html: this.formattedMD}}/>
    )
  }
}
