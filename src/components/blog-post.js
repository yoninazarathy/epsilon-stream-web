import React from 'react';
import {connect} from 'react-redux'
import $ from 'jquery'

// full options list (defaults)
var md = require('markdown-it')({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      false,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});

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
    //console.log(url)
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
        <div className = "blogPost">
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
