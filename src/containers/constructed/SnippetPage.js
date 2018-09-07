import React from 'react'
import { withRouteData, Link } from 'react-static'
// import { SnippetPage } from '../../components/pages/snippet-page';
//
import EpsilonStreamPage from '../../new-components/pages/epsilon-stream-page';

export default withRouteData(({ snippet }) => (
  <EpsilonStreamPage title="Snippet" hassearch={true}>
    <Link to="/snippets/">{'<'} Back</Link>
    <h2> {snippet.ourTitle}</h2>
    <p> {snippet.body}</p>
  </EpsilonStreamPage>
))
