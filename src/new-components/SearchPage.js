import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class SearchPage extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.match.params.query}</h1>
            </div>
        )
    }
}


export default withRouter(SearchPage)