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
      isOpen: false, //QQQQ REPLACE
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }


  handleKeyPress(event){
    //console.log("key: " + event.key)
  //console.log(event.target.value)
  if (event.key !== 'Enter'){
      //store.dispatch({type: "USER_SEARCH_IS_TYPING",payload:{value:event.target.value}})
  }else{
      store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
      updateSearchAction(event.target.value)
      console.log(event.target.value)
  }
}

handleChange(event){
//console.log("val: " + event.target.value)
this.setState({...this.state, value:event.target.value})
if(event.target.value === ''){
    store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
    updateSearchAction(event.target.value)
}else{
    store.dispatch({type: "USER_SEARCH_IS_TYPING",payload:{value:event.target.value}})
}
//updateSearchAction(event.target.value)


}

  render(){
    return(
        <div>
          <InputGroup>
          
                      <Input type="text" className="w-100 ml-auto"
                              name="search" placeholder="Search Mathematics"
                              value={this.state.value}
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
