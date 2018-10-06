import React from 'react';
import {connect} from 'react-redux'
import { NavbarToggler,NavItem,Row,Col,Container,InputGroup,InputGroupAddon, Button, Navbar, Nav, NavbarBrand, Collapse, Input} from 'reactstrap';
import { withRouter } from 'react-router-dom'

import randomChoiceAction from '../redux/actions/random-choice-action.js'
import updateSearchAction from '../redux/actions/update-search-action.js'
import clearSearchStringAction from '../redux/actions/clear-search-string-action'
import userHomeAction from '../redux/actions/user-home-action';

import HomeImage from '../assets/Home.png'
import Surprise1 from '../assets/Surprise1.png'
import Surprise2 from '../assets/Surprise2.png'
import Surprise3 from '../assets/Surprise3.png'
import Surprise4 from '../assets/Surprise4.png'
import Surprise5 from '../assets/Surprise5.png'
import Surprise6 from '../assets/Surprise6.png'
import Erase from '../assets/Errase_Icon_Small_Active@3x.png'

import {ourStore} from '../redux/store.js'
import {push} from 'react-router-redux'
import querystring from 'query-string';

let buttonArray = [Surprise1,Surprise2,Surprise3,Surprise4,Surprise5,Surprise6]
let index = 0

const SurpriseButton = withRouter(({history}) => (
  <Button size="lg" color="link" outline={true} className="searchBarButton randombutton"
      onClick={()=>{index = index===5?0:index+1;randomChoiceAction(history)}}>
      <img alt="surprise" src={buttonArray[index]} width={40} height={40} />
  </Button>
))

const EraseButton = withRouter(({history}) => (
  <Button size="lg" color="link" outline={true} className="searchBarButton erasebutton"
      onClick={()=>{
          document.getElementById("inputField").value = ""
          clearSearchStringAction()}
          }>
      <img alt="erase" src={Erase} width={40} height={40} />
  </Button>
))

class SearchBarX extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
    this.handleChange   = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event){
    // console.log("handleChange()")
    // console.log(event.target.value)
    this.setState({
      ...this.state,
      value: event.target.value,
    }); 
    ourStore.dispatch({type: "UPDATE_SEARCH_STRING",payload: event.target.value})
  }

    handleKeyPress(event){
      // console.log("handleKeyPress()")
      // console.log(event.key)
      if (event.key === 'Enter'){
        let cleanerString = event.target.value.replace(/\s+/g, " ").replace(/^\s|\s$/g, "").toLowerCase()
        this.setState({
          ...this.state,
          //appearingSearchString: cleanerString,
          value: cleanerString,
        });   
        updateSearchAction(cleanerString,this.props.history)
      }
    }
 
  render(){
    return(
      <InputGroup>
        <Input  bsSize="lg"
                type="text"
                id="inputField"
                name="search"
                value={this.state.appearingSearchString}
                placeholder="Search Mathematics"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                autoComplete = "off" />
        <InputGroupAddon addonType="append">
          {this.state.value !== "" ? <EraseButton/> : <SurpriseButton/>}
        </InputGroupAddon>
      </InputGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    snippetDict: state.database.snippetDict, //QQQQ replace
    storeSearchString: state.user.rawSearchString
  };
};

export default connect(mapStateToProps)(SearchBarX);
export {SearchBarX}

const SearchBar = withRouter(connect(mapStateToProps)(SearchBarX));
export {SearchBar}