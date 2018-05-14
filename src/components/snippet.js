import React from 'react';
import {connect} from 'react-redux'

var md = require('markdown-it')();
var mk = require('markdown-it-katex');
md.use(mk);

function stichLinks(mdText){
  return mdText.replace(/\[[^\[^\]^\(^\)]*\]\([^\[^\]^\(^\)]*\)/gi,
    (x) => {return x.replace(/\([^\[^\]^\(^\)]*\)/,
      (x)=>{return'(search?q='+x.substring(1,x.length-1).split(' ').join('+') +')'})
  });
}

class Snippet extends React.Component{
  formattedMD: "" 
 
  render(){
    let rawMarkDown = this.props.snippetDict[this.props.mathObject]
    // console.log("object: " + this.props.mathObject)
    // console.log(this.props.snippetDict)
    if(rawMarkDown !== undefined){
      if(this.props.snippetImageDict[this.props.mathObject] !== undefined){
        rawMarkDown += '\n\r'
        rawMarkDown += "[image1]:" + this.props.snippetImageDict[this.props.mathObject]
      }

      rawMarkDown = stichLinks(rawMarkDown)
      console.log('QQQQ')
      console.log(rawMarkDown)
      this.formattedMD = md.render(rawMarkDown)
    }else{
      this.formattedMD = md.render("# There is no snippet for \#" + this.props.mathObject)
    }

    return(
        <div>
          <span dangerouslySetInnerHTML={{__html: this.formattedMD}} />
        </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    snippetDict: state.database.snippetDict,
    snippetImageDict: state.database.snippetImageDict
  };
};

export default connect(mapStateToProps)(Snippet);
export {Snippet}
