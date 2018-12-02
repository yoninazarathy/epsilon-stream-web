import React, { Component } from 'react';
import {withRouteData, Link } from 'react-static'
import Blog from '../../components/blog.js'
import {Helmet} from 'react-helmet'
import EpsilonStreamPage from '../../components/pages/epsilon-stream-page';
import { ourStore } from '../../redux/store'

class EpsilonBlogPage extends Component {
  
  componentWillMount() {
      if (typeof document !== 'undefined') {
        ourStore.dispatch({type: "SET_PAGE_TITLE", payload: "Epsilon Stream"})
      }
  }

  render() {
    return (
      <div>
        <Helmet>
        <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:description" content={"Blog Post "+"with "+"Epsilon Stream"} />
          <meta property="og:title" content={"Blog Post" + " on Epsilon Stream"} />
          <meta property="og:image" content={this.props.post.imageUrl} />
          {/*<meta property="og:url" content="https://epsilonstream.com" />*/}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content={"Blog "+" @ "+"Epsilon Stream"} />
          <meta name="twitter:image:alt" content="Watch, Play and Explore Mathematics." />
          <meta name="twitter:site" content="@OneOnEpsilon" />
          <title> {"Blog Post "+" with "+"Epsilon Stream"} </title>
        </Helmet>
        <EpsilonStreamPage
            className = "epsilonBlogPage"
            title="Blog Post" 
            hassearch={true} 
            needsDB={false}
            history={this.props.history}
            backgroundExtraClass="blogbackground"
            >
            <div className="blogpost">
              <br/>
              <Blog rawMarkDown = {this.props.post.markDown}/>
            </div>
        </EpsilonStreamPage>
      </div>
    )
  }
}

export default withRouteData(EpsilonBlogPage);