import React, { Component } from 'react';
import EpsilonStreamPage from '../components/pages/epsilon-stream-page';

import { withRouter } from 'react-router-dom';

class Search extends Component {
    render() {
        return (
            <EpsilonStreamPage title="Search" hassearch={true}>
                <h1>{this.props.match.params.query}</h1>
            </EpsilonStreamPage>
        )
    }
}


export default withRouter(Search)