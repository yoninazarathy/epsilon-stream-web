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
  <Button color="link" className="noborderradius randombutton"
      onClick={()=>{index = index===5?0:index+1;randomChoiceAction(history)}}>
      <img alt="surprise" src={buttonArray[index]} width={30} height={30} />
  </Button>
))

const EraseButton = withRouter(({history}) => (
  <Button color="link" className="noborderradius erasebutton"
      onClick={()=>{clearSearchStringAction()}}>
      <img alt="erase" src={Erase} width={30} height={30} />
  </Button>
))


class SearchBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      appearingSearchString: this.props.startQuery,
      typedSearchString: "",
      userIsTyping: false,
    };
    this.handleChange   = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.updateModel    = this.updateModel.bind(this);

    // if(this.state.searchString != ' '){
    //   this.updateModel(this.state.searchString,true)
    // }
  }

  handleChange(event){
    this.setState({
      ...this.state,
      appearingSearchString: event.target.value,
      typedSearchString: event.target.value,
      userIsTyping: true,
    });      
  }

    handleKeyPress(event){
      console.log(event)
      console.log(event.key)
      if (event.key === 'Enter'){
        let cleanerString = event.target.value.replace(/\s+/g, " ").replace(/^\s|\s$/g, "")
        this.setState({
          ...this.state,
          appearingSearchString: cleanerString,
          typedSearchString: cleanerString,
          userIsTyping: false,
        });   
      }
    }
  


    // if(event.target.value === ''){
    //     this.updateModel('',true)
    // }else{
    //     this.updateModel(event.target.value,false)
    // }
  // }


  // updateModel(searchString,finishedTyping){
  //   console.log("updateModel("+searchString+","+finishedTyping+")")
  //   this.setState({
  //     ...this.state,
  //     appearingSearchString: searchString,
  //     typedSearchString: searchString,
  //     userIsTyping: true,
  //   });      
  //   console.log(this.state)
    // if(finishedTyping){
    //   //TTTT ourStore.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
    //   if(this.state.searchString !== ''){
    //     let query = searchString.toLowerCase().split(' ').join('+');
    //     //TTTT ourStore.dispatch(push('/search?q='+query))
    //   }else{
    //     //TTTT ourStore.dispatch(push('/search'))
    //   }
    //   updateSearchAction(searchString)
    //   this.state = {
    //     ...this.state,
    //     isInControl: false
    //   }
    // }else{
    //   // ourStore.dispatch({type: "USER_SEARCH_IS_TYPING",payload:{value:searchString}})
    // }
  // }

 
  render(){
    return(
        <div>
          <InputGroup>
            <Input type="text"
                    id="inputField"
                    name="search" 
                    value={this.state.appearingSearchString}
                    placeholder="Search Mathematics"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    autoComplete = "off" />
            <InputGroupAddon addonType="append">
              {this.state.userIsTyping && this.state.typedSearchString !== "" ? <EraseButton/> : <SurpriseButton/>}
            </InputGroupAddon>
          </InputGroup>
        </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    snippetDict: state.database.snippetDict, //QQQQ replace
    storeSearchString: state.user.rawSearchString
  };
};

export default connect(mapStateToProps)(SearchBar);
export {SearchBar}
