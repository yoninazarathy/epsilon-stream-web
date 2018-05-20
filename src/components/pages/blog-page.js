import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'

class BlogPage extends Component {
  render() {
    return (
        <EpsilonStreamPage>
            <p>Blog.</p>
        </EpsilonStreamPage>
    );
  }
}

export default connect()(BlogPage);