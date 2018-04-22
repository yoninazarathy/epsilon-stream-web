import React from 'react';
import './App.css';

//import {Provider} from 'react-redux'
import {ConnectedRouter as Router} from 'react-router-redux';
import {store, history} from './store.js'

import {Route, Switch} from 'react-router-dom'

import SearchPage from './components/pages/search-page.js'
import WatchPage from './components/pages/watch-page.js'
import SettingsPage from './components/pages/settings-page.js'
import NotFoundPage from './components/pages/notfound-page.js'



class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={SearchPage} />{/*was IndexPage*/}
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/watch" component={WatchPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path='*' component={NotFoundPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

function refreshStore() {
  store.dispatch({type : "FETCH_FULL_PULL_START"})
  setTimeout(refreshStore, 3*1000*60*60)
}

refreshStore()

export default App;
