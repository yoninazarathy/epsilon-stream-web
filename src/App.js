import React, { Component } from 'react';
import './App.css';

import {Provider} from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import {store, history} from './store.js'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import IndexPage from './components/pages/index-page.js'
import ProductPage from './components/pages/product-page.js'
import SearchPage from './components/pages/search-page.js'
import WatchPage from './components/pages/watch-page.js'
import SettingsPage from './components/pages/settings-page.js'
import PeekerPage from './components/pages/peeker-page.js'
import NotFoundPage from './components/pages/notfound-page.js'



class App extends React.Component {
  render() {
    console.log("Yo")
    console.log(ConnectedRouter)
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={SearchPage} />{/*was IndexPage*/}
            <Route exact path="/product" component={ProductPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/watch" component={WatchPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/peeker" component={PeekerPage} />
            <Route exact path='*' component={NotFoundPage} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

function refreshStore() {
  console.log("I'm here")
  store.dispatch({type : "FETCH_FULL_PULL_START"})

  setTimeout(refreshStore, 1000*60*60)
}

refreshStore()

export default App;