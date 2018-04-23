//import _ from 'lodash';
import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'
import SearchResults from '../search/search-results.js';
import SearchAutoCompleteList from '../search/search-autocomplete-list.js'
//import updateSearchAction from '../../actions/update-search-action.js'
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import { withRouter } from 'react-router-dom'
import {store} from '../../store.js'


class SearchPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



    // Search
    handleChange(event) {
      this.setState({value: event.target.value});
      if(event.target.value === ""){
        store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
      }
      //updateSearchAction(event.target.value)
      //store.dispatch(push('?search='+event.target.value))
      //this.props.activeRouteHandler({key: "test"})
    }
  render() {
    //const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 200);
    return (
        <div>
        <EpsilonStreamPage title="Search" hassearch={true}>
            {this.props.searchTypingInProgress ? <SearchAutoCompleteList/> : <SearchResults/>}
        </EpsilonStreamPage>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Epsilon Stream Beta</ModalHeader>
            <ModalBody>
                This is the beta version of our Epsilon Stream Web-App. We are working hard to finalize it. If you have an iPhone or iPad, you may enjoy a free and fully functional <a href="https://itunes.apple.com/app/id1200152358"> iOS version</a> now. Otherwise, feel free to try out this Beta version. You may also register to give us feedback.
            </ModalBody>
            <ModalFooter>
                  {/*<Button color="primary" onClick={this.toggle}>Thanks</Button>*/}
                  {' '}
                  <Button color="primary" 
                            onClick={() => {this.toggle;
                                            window.open("https://about.epsilonstream.com/beta-tester/", '_blank')}
                                        }>Register</Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchTypingInProgress: state.user.searchTypingInProgress,
  };
};

export default connect(mapStateToProps)(SearchPage);
export {SearchPage}
