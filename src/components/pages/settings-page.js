import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'

class SettingsPage extends Component {
  render() {
    return (
        <EpsilonStreamPage title="Settings" hassearch={false}>
            <p>Settings.</p>
        </EpsilonStreamPage>
    );
  }
}

export default connect()(SettingsPage);