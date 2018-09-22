import React, { Component } from 'react';
import EpsilonStreamPage from '../components/pages/epsilon-stream-page';
import {ourStore} from '../redux/store'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

class Search extends Component {
    render() {
        return (
            <EpsilonStreamPage title="Search" hassearch={true}>
                <h1>{this.props.match.params.query}</h1>
            </EpsilonStreamPage>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      appLoaded: state.user.appLoaded,
    };
  };
  
  export default connect(mapStateToProps)(Search);