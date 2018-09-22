// import React, { Component } from 'react';
// import EpsilonStreamPage from './epsilon-stream-page.js';
// import {connect} from 'react-redux'
// import querystring from 'query-string'
// import BlogPost from '../blog-post.js'
// import blogPostAction from '../../actions/blog-post-action.js'

// class BlogPage extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       parsedQuery: ''
//     };

//     if(this.props.qs !== ''){
//       let qry = this.props.location.search;
//       let parsed = querystring.parse(this.props.qs)
//       // console.log(parsed)
//       if('post' in parsed ){
//         this.state.parsedQuery = parsed.post;
//       }
//     }

//     blogPostAction()
//   }


//   render() {
//     return (
//         <EpsilonStreamPage>
//             <BlogPost blogId={this.state.parsedQuery}/>
//         </EpsilonStreamPage>
//     );
//   }
// }

// export default connect()(BlogPage);