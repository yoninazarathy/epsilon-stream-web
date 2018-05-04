import React from 'react';
import {connect} from 'react-redux'

var md = require('markdown-it')();
var mk = require('markdown-it-katex');
md.use(mk);

class Snippet extends React.Component{
  formattedMD: ""

  constructor(props) {
    super(props);
    let rawMarkDown = this.props.snippetDict[props.mathObject]
    console.log("object: " + props.mathObject)
    console.log(this.props.snippetDict)
    if(rawMarkDown !== undefined){
      this.formattedMD = md.render(rawMarkDown)
    }else{
      this.formattedMD = md.render("# There is no snippet for \#" + props.mathObject)
    }
    console.log(this.formattedMD)
    };


  render(){
    return(
        <span dangerouslySetInnerHTML={{__html: this.formattedMD}} />
    )
  }
}
const mapStateToProps = (state) => {
  return {
    snippetDict: state.database.snippetDict,
  };
};

export default connect(mapStateToProps)(Snippet);
export {Snippet}
