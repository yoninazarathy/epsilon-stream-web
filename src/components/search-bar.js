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
  <Button color="link" className="noborderradius randombutton"
      onClick={randomChoiceAction}>
      <img alt="surprise" src={Surprise1} width={30} height={30} />
  </Button>
))

class SearchBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      searchString: this.props.startQuery,
      isInControl: false 
    };
    this.handleChange   = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateModel    = this.updateModel.bind(this);

    if(this.state.searchString != ' '){
      this.updateModel(this.state.searchString,true)
    }
  }

  updateModel(searchString,finishedTyping){
    this.setState({
      searchString: searchString,
      isInControl: true
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
      this.setState({
        ...this.state,
        isInControl: false
      })
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

  //QQQQ doesn't seem to work
  //  getDerivedStateFromProps(nextProps, prevState){
  //   console.log("here baby:")
  //   return{
  //     searchString: nextProps.storeSearchString
  //   }
  // }

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
            <Input type="text"
                    id="inputField"
                    name="search" 
                    value={this.state.isInControl ?  this.state.searchString: this.props.storeSearchString}
                    placeholder="Search Mathematics"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    autoComplete = "off" />
            <InputGroupAddon addonType="append">
              <SurpriseButton/>
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
