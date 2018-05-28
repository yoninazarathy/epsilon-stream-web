import React from 'react';
import {connect} from 'react-redux'
import $ from 'jquery'

var md = require('markdown-it')();
var mk = require('markdown-it-katex');
md.use(mk);

class BlogPost extends React.Component{
  
  gotMDCallback(result){
    this.setState({formattedMD: result})
  }

  constructor(props){
    super(props);

    this.state = {
      rawMD: '',
      formattedMD: ''
    };

    this.gotMDCallback = this.gotMDCallback.bind(this);

    let url = "https://es-app.com/blog/"+this.props.blogId+".md"
    console.log(url)
    $.ajax(
      {
        url: url,
        success: this.gotMDCallback
      }
    )
  }


 
  render(){
    let rawMarkDown = this.state.formattedMD
    if(rawMarkDown !== undefined){
      this.formattedMD = md.render(rawMarkDown)
    }else{
      this.formattedMD = md.render("# No post")
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
    snippetDict: state.database.snippetDict, //QQQQ update
  };
};

export default connect(mapStateToProps)(BlogPost);
export {BlogPost}
