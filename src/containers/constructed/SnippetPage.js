import React from 'react'
import { withRouteData, Link } from 'react-static'
import Snippet from '../../new-components/snippet.js'

// import { SnippetPage } from '../../components/pages/snippet-page';
//
import EpsilonStreamPage from '../../new-components/pages/epsilon-stream-page';

export default withRouteData(({ snippet }) => (
  <EpsilonStreamPage title="Snippet" hassearch={true}>
    <h2> {snippet.ourTitle}</h2>
    <br/>
    <Snippet rawMarkDown = {snippet.body}  imageName = {snippet.imageURL}/>
  </EpsilonStreamPage>
))
