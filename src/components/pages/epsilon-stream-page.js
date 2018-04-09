import React, { Component } from 'react';
import { Button, Navbar, Nav, NavbarBrand, NavbarToggler, Collapse, Form, Input} from 'reactstrap';
import VerticalLogo from '../../assets/Vertical_logo_1_outlines@4x.png'
import Icon from '../../assets/icon.png'
import SettingsImage from '../../assets/3dotsMenu.png'
import HomeImage from '../../assets/Home.png'
import RightButtonImage from '../../assets/Right_Passive.png'
import LeftButtonImage from '../../assets/Left_Passive.png'
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom'

// import '../App.css';
import updateSearchAction from '../../actions/update-search-action.js'
import {connect} from 'react-redux'
import userHomeAction from '../../actions/user-home-action';

import {store} from '../../store.js'
import {push} from 'react-router-redux'

const ProductButton = withRouter(({history}) => (
    <img className="productButton mr-sm-2" src={Icon} width={45} onClick={() => {window.open("https://epsilonstream.com", '_blank')} } />
))


const HomeButton = withRouter(({history}) => (
    <Button outline color="light" className="ml-sm-2 mr-sm-2"
        onClick={userHomeAction}>
        {/*<img alt="home" src={HomeImage} width={30} height={30} />*/}
        Home
    </Button>
))

const SettingsButton = withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {history.push('/settings')}}>
        <img alt="settings" src={SettingsImage} width={30} height={30} />
    </Button>
))
class EpsilonStreamPage extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        value: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
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

    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.value);
      //event.preventDefault();
      //store.dispatch(push('/search'))
      //history.push('/search')
    }

    handleKeyPress(event){
        console.log("key: " + event.key)
        if (event.key !== 'Enter'){
            store.dispatch({type: "USER_SEARCH_IS_TYPING",payload:{}})
            //  console.log("enter enter enter")
            //  console.log(this.state.value)
        }else{
            store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
            updateSearchAction(event.target.value)
            this.state.value = event.target.value
        }
    }

//     handleClick() {
//     this.setState({
//         open: !this.state.open
//     });
// }
    render() {
        return (
            <div className="EpsilonStreamPage">
                <Navbar color = "danger" light expand="md">
                    <NavbarBrand href="/" color = "white">
                    <ProductButton /> Epsilon Stream Beta</NavbarBrand>
                   {/*<NavbarToggler onClick={this.toggle} />*/}
                    {
                        this.props.hassearch ?
                        <Collapse isOpen={true/*this.state.isOpen*/} navbar>
                            <Nav className="w-100" navbar expand = "md">
                                {/*<LeftButton />*/}
                                {/*<RightButton />*/}
                                <Form inline className="w-100">
                                    <Input  type="text" className="w-100 ml-auto"
                                            name="search" placeholder="Search Mathematics"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            onKeyPress={this.handleKeyPress}
                                            autocomplete = "off"
                                    />
                                    {/*<SearchButton />
                                    <SurpriseButton />
                                    <HomeButton />*/}
                                </Form>
                            </Nav>
                        </Collapse>
                        : ""
                    }
                    {/*<SettingsButton/>*/}
                </Navbar>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchString: state.user.cleanSearchString,
    };
};

export default connect(mapStateToProps)(EpsilonStreamPage);
