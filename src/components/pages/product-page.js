import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'

class ProductPage extends Component {
  constructor(props){
    super(props)
    window.location.replace("https://epsilonstream.com")
  }
  render() {
    return (
        <EpsilonStreamPage title="Product">
            <p>Product.</p>
        </EpsilonStreamPage>
    );
  }
}

export default connect()(ProductPage);
export {ProductPage}