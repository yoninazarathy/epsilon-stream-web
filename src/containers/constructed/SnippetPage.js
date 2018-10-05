import React from 'react'
import { withRouteData, Link } from 'react-static'
import Snippet from '../../components/snippet.js'
import {Helmet} from 'react-helmet'
import EpsilonStreamPage from '../../components/pages/epsilon-stream-page';

export default withRouteData(({ snippet }) => (
  <div>
    <Helmet>
    <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:description" content={"Snippet "+"with "+"Epsilon Stream"} />
      <meta property="og:title" content={"title" + " on Epsilon Stream"} />
      <meta property="og:image" content={"imageURL"} />
      {/*<meta property="og:url" content="https://epsilonstream.com" />*/}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content={"Snippet "+" @ "+"Epsilon Stream"} />
      <meta name="twitter:image:alt" content="Watch, Play and Explore Mathematics." />
      <meta name="twitter:site" content="@OneOnEpsilon" />
      <title> {"Video "+" with "+"Epsilon Stream"} </title>
    </Helmet>
    <EpsilonStreamPage title="Snippet" hassearch={true} needsDB={false}>
      <h2> {snippet.ourTitle}</h2>
      <br/>
      <Snippet rawMarkDown = {snippet.body}  imageName = {snippet.imageURL}/>
    </EpsilonStreamPage>
  </div>
))