/*
import React from 'react';
import {ConnectedRouter as Router} from 'react-router-redux';
import {store, history,isAndroid} from './store.js'
import {Route, Switch} from 'react-router-dom'
import WatchPage from './components/pages/watch-page.js'
import SettingsPage from './components/pages/settings-page.js'
import BlogPage from './components/pages/blog-page.js'
import NotFoundPage from './components/pages/notfound-page.js'
import SmartBanner from 'react-smartbanner';
import '../node_modules/react-smartbanner/dist/main.css';
import { SnippetPage } from './components/pages/snippet-page';
import {Helmet} from "react-helmet";

*/

// import SearchPage from './components/pages/search-page.js'

import './App.css';
import React from 'react'
import { Router, Link } from 'react-static'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import Search from './containers/Search'

import store from './redux/store'

//import './app.css'

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/search/:query" component={Search} />
              <Routes />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
    )
  }
}

export default hot(module)(App)
/*


class App extends React.Component {
  render() {
    const SearchPageWithQS = (props) => {return (<SearchPage qs={history.location.search} {...props}/>);}
    const SearchPageWithHome = (props) => {return (<SearchPage qs={"home"} {...props}/>);}
    const SearchPageWithPicks = (props) => {return (<SearchPage qs={"picks"} {...props}/>);}
    const SearchPageWithNews = (props) => {return (<SearchPage qs={"news"} {...props}/>);}
    const SearchPageWithCurious = (props) => {return (<SearchPage qs={"curious"} {...props}/>);}
    const SnippetPageWithQS = (props) => {return (<SnippetPage qs={history.location.search} {...props}/>);}
    const WatchPageWithQS = (props) => {return (<WatchPage qs={history.location.search} {...props}/>);}
    const BlogPageWithQS = (props) => {return (<BlogPage qs={history.location.search} {...props}/>);}

    return (
      <Router history={history}>
        <div className="App">
        <Helmet>
          <meta property="og:title" content="Epsilon Stream Platform" />
          <meta property="og:description" content="Watch, Play and Explore Mathematics." />
          <meta property="og:image" content="https://es-app.com/assets/935xva.jpg" />
          <meta property="og:url" content="https://epsilonstream.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content="Epsilon Stream" />
          <meta name="twitter:image:alt" content="Watch, Play and Explore Mathematics." />
          <meta name="twitter:site" content="@OneOnEpsilon" />
        </Helmet>
          {isAndroid() ? '' :<SmartBanner title={'Epsilon Stream'}  />}
          <Switch>
            <Route exact path="/"         render={SearchPageWithQS} />
            <Route exact path="/search"   component={SearchPageWithQS} />
            <Route exact path="/home"     component={SearchPageWithHome} />
            <Route exact path="/curious"  component={SearchPageWithCurious} />
            <Route exact path="/curious-epsilon"  component={SearchPageWithCurious} />
            <Route exact path="/picks"    component={SearchPageWithPicks} />
            <Route exact path="/epsilon-picks"  component={SearchPageWithPicks} />
            <Route exact path="/news"     component={SearchPageWithNews} />
            <Route exact path="/watch"    component={WatchPageWithQS} />
            <Route exact path="/snippet"  component={SnippetPageWithQS} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/blog"     component={BlogPageWithQS} />
            <Route exact path='*'         component={NotFoundPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

function refreshStore() {
  //QQQQ store.dispatch({type : "FETCH_FULL_PULL_START"})
  setTimeout(refreshStore, 3*1000*60*60)
}

refreshStore()

document.onkeydown = checkKey;

//QQQQ get to this: https://stackoverflow.com/questions/27711018/cleaner-way-to-change-focus-on-child-components-in-react?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      console.log("up arrow")
      //$(".move:focus").prev().focus(); 
    }
    else if (e.keyCode == '40') {
      console.log("down arrow")
      // $(".move:focus").next().focus();

    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}


export default App;
*/