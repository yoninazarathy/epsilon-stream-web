import React, { Component } from 'react';
import {connect} from 'react-redux'
import EpsilonStreamPage from './epsilon-stream-page.js';
import {store} from '../../store.js'

class IndexPage extends Component {
  render() {
    // this.props = {...this.props,
    //             counter: 244}
    // console.log(this.props)
    return (
        <EpsilonStreamPage title="Index">
            <p>Index {this.props.counter}</p>
            {/*<button type='button' onClick={() => {store.dispatch({type: "RESET_STORE",payload:{}});console.log(store);}}>Reset</button>*/}
            <button type='button' onClick={this.props.decrementUser}>Decrement (make it a bit smaller)</button>
            <button type='button' onClick={this.props.incrementUser}>Increment (make it a bit bigger)</button>
            <button type='button' onClick={this.props.resetUserStore}>RESET</button>
        </EpsilonStreamPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.user.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetUserStore : () => dispatch({
      type : "RESET_USER_STORE"
    }),
    incrementUser : () => dispatch({
      type : "INCREMENT"
    }),
    decrementUser : () => dispatch({
      type : "DECREMENT"
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);
export {IndexPage}

