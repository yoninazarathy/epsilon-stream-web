import React from 'react';

var md = require('markdown-it')();
var mk = require('markdown-it-katex');
var mt = require('markdown-it-multimd-table');
md.use(mk);
md.use(mt);

function stichLinks(mdText){
  return mdText.replace(/\[[^\[^\]^\(^\)]*\]\([^\[^\]^\(^\)]*\)/gi,
    (x) => {return x.replace(/\([^\[^\]^\(^\)]*\)/,
      (x)=>{return'(search?q='+x.substring(1,x.length-1).split(' ').join('+') +')'})
  });
}

export default class Snippet extends React.Component{
  formattedMD: "" 

  render(){
    let rawMarkDown = this.props.rawMarkDown
    if(rawMarkDown !== undefined){
      if(this.props.imageName !== undefined && this.props.imageName.trim() !== ""){
        rawMarkDown += '\n\r'
        rawMarkDown += "[image1]:" + this.props.imageName
      }

      rawMarkDown = stichLinks(rawMarkDown)
      this.formattedMD = md.render(rawMarkDown)
    }else{
      this.formattedMD = md.render("# There is no snippet for \#" + this.props.mathObject)
    }
    return(
        <div dangerouslySetInnerHTML={{__html: this.formattedMD}}/>
    )
  }
}
