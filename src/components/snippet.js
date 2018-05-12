import React from 'react';
import {connect} from 'react-redux'

var md = require('markdown-it')();
var mk = require('markdown-it-katex');
md.use(mk);

class Snippet extends React.Component{
  formattedMD: ""

  render(){
    let rawMarkDown = this.props.snippetDict[this.props.mathObject]
    // console.log("object: " + this.props.mathObject)
    // console.log(this.props.snippetDict)
    if(rawMarkDown !== undefined){
      this.formattedMD = md.render(rawMarkDown)
    }else{
      this.formattedMD = md.render("# There is no snippet for \#" + this.props.mathObject)
    }
    console.log(this.formattedMD)
    return(
        <div>
        <span dangerouslySetInnerHTML={{__html: this.formattedMD}} />
          {this.props.snippetImageDict[this.props.mathObject] !== undefined ? 
            <img  alt = {'missing'} 
                  source={this.props.snippetImageDict[this.props.mathObject]} 
                  width = {30} height = {30}/>
            :
            ''
          }
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
