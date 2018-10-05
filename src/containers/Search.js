import React, { Component } from 'react';
import EpsilonStreamPage from '../components/pages/epsilon-stream-page';
import {ourStore} from '../redux/store'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'

class Search extends Component {
    constructor(props) {
        super(props);
      }
    
    render() {
        return (
            <div>
                <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:description" content={"Epsilon Stream"} />
                <meta property="og:title" content="Epsilon Stream Platform" />
                <meta property="og:image" content="https://es-app.com/assets/935xva.jpg" />
                <meta property="og:url" content="https://epsilonstream.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="og:site_name" content={"Epsilon Stream"} />
                <meta name="twitter:image:alt" content="Watch, Play and Explore Mathematics." />
                <meta name="twitter:site" content="@OneOnEpsilon" />
                <title> {"Epsilon Stream"} </title>
                </Helmet>
                <EpsilonStreamPage title="Search" hassearch={true} parsedQuery = {this.props.match.params.query}>
                    <center>
                        <h1>
                            No match for: {this.props.match.params.query}
                        </h1>
                    </center>
                </EpsilonStreamPage>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
  };
  
  export default connect(mapStateToProps)(Search);