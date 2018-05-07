import React from 'react';
import {connect} from 'react-redux'
import { NavbarToggler,NavItem,Row,Col,Container,InputGroup,InputGroupAddon, Button, Navbar, Nav, NavbarBrand, Collapse, Input} from 'reactstrap';
import { withRouter } from 'react-router-dom'
import randomChoiceAction from '../actions/random-choice-action.js'
import userHomeAction from '../actions/user-home-action';
import HomeImage from '../assets/Home.png'
import Surprise1 from '../assets/Surprise1.png'
import {store} from '../store.js'
import updateSearchAction from '../actions/update-search-action.js'
import {push} from 'react-router-redux'
import querystring from 'query-string';


const SurpriseButton = withRouter(({history}) => (
  <Button color="danger" className="ml-sm-2 mr-sm-2"
      onClick={randomChoiceAction}>
      <img alt="surprise" src={Surprise1} width={30} height={30} />
  </Button>
))

const HomeButton = withRouter(({history}) => (
  <Button  color="danger" className="ml-sm-2 mr-sm-2"
      onClick={userHomeAction}>
      <img alt="home" src={HomeImage} width={30} height={30} />
  </Button>
))


class SearchBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      searchString: "", 
    };
    this.handleChange   = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateModel    = this.updateModel.bind(this);
  }

  updateModel(searchString,finishedTyping){
    this.setState({
      searchString: searchString
    });      
    if(finishedTyping){
      store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
      if(this.state.searchString !== ''){
        let query = searchString.toLowerCase().split(' ').join('+');
        store.dispatch(push('/search?q='+query))
      }else{
        store.dispatch(push('/search'))
      }
      updateSearchAction(searchString)
    }else{
      store.dispatch({type: "USER_SEARCH_IS_TYPING",payload:{value:searchString}})
    }
  }

  handleKeyPress(event){
    if (event.key === 'Enter'){
      this.updateModel(event.target.value.replace(/\s+/g, " ").replace(/^\s|\s$/g, ""),true)
    }
  }

  handleChange(event){
    if(event.target.value === ''){
        this.updateModel('',true)
    }else{
        this.updateModel(event.target.value,false)
    }
  }

  updateDisplay(){

  }

  render(){
    // if(this.props.startQuery !== ''){
    //   //updateSearchAction(this.props.startQuery)
    //   this.setState({
    //     searchString: this.props.startQuery
    //   });  
    // }
    return(
        <div>
          <InputGroup>
                      <Input type="text" className="w-100 ml-auto"
                              id = "inputField"
                              name="search" 
                              value={this.state.searchString}
                              placeholder="Search Mathematics"
                              onChange={this.handleChange}
                              onKeyPress={this.handleKeyPress}
                              autoComplete = "off" />
                              <InputGroupAddon >
                                  <SurpriseButton/>
                              </InputGroupAddon>
                              <InputGroupAddon >
                                  <HomeButton />
                              </InputGroupAddon>
          </InputGroup>
        </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    snippetDict: state.database.snippetDict, //QQQQ replace
  };
};

export default connect(mapStateToProps)(SearchBar);
export {SearchBar}
