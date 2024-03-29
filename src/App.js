import {isAndroid} from './redux/store.js'
//import SmartBanner from 'react-smartbanner';
import './App.css';
import React from 'react'
import { Router, Link } from 'react-static'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import Search from './containers/Search'
import { ourStore } from './redux/store'

import loadDbAction from './redux/actions/reload-db-action'

class App extends React.Component {
  constructor(props){
    super(props);

    //QQQQ can improve and test on process.env.REACT_STATIC_ENV === 'production'
    if (typeof document !== 'undefined') {
      // If we're not building but in the browser, load the DB
      loadDbAction()
      if ("Android" in window) {
        ourStore.dispatch({type: "SET_ENVIRONMENT", payload: "android-app"})
      } else if ("IOSWebView" in window) {
        ourStore.dispatch({type: "SET_ENVIRONMENT", payload: "ios-app"})
      } else {
        ourStore.dispatch({type: "SET_ENVIRONMENT", payload: "web"})
      }
    }
  }

  render() {
    return(
      <Provider store={ourStore}>
        <Router>
        <div>
          {/*isAndroid() ? '' :<SmartBanner title={'Epsilon Stream'}  />*/}
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

/* document.onkeydown = checkKey;

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
*/