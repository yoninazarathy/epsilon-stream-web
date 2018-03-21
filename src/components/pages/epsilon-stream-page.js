import React, { Component } from 'react';
import { Button, Navbar, Nav, NavbarBrand, NavbarToggler, Collapse, Form, Input} from 'reactstrap';
import VerticalLogo from '../../assets/Vertical_logo_1_outlines@4x.png'
import Icon from '../../assets/icon.png'
import SettingsImage from '../../assets/3dotsMenu.png'
import HomeImage from '../../assets/Home.png'
import RightButtonImage from '../../assets/Right_Passive.png'
import LeftButtonImage from '../../assets/Left_Passive.png'
import randomChoiceAction from '../../actions/random-choice-action.js'
import MediaQuery from 'react-responsive';

// import '../App.css';
import { withRouter } from 'react-router-dom'
import updateSearchAction from '../../actions/update-search-action.js'
import {connect} from 'react-redux'
import userHomeAction from '../../actions/user-home-action';

import {store} from '../../store.js'
import {push} from 'react-router-redux'

const ProductButton = withRouter(({history}) => (
    <img className="productButton mr-sm-2" src={Icon} width={45} onClick={() => {history.push('/product') }} />
))

const LeftButton = withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {console.log("left....")}}>
        <img alt="left" src={LeftButtonImage} width={30} height={30} />
    </Button>
))

const RightButton = withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {console.log("right....")}}>
        <img alt="right" src={RightButtonImage} width={30} height={30} />
    </Button>
))

const SearchButton = withRouter(({history}) => (
    <Button outline color="light" className="ml-sm-2"
        onClick={() => {history.push('/search')}}>
        Search
    </Button>
))

const SurpriseButton = withRouter(({history}) => (
    <Button outline color="light" className="ml-sm-2 mr-sm-2"
        onClick={randomChoiceAction}>
        Surprise
    </Button>
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
      updateSearchAction(event.target.value)
      //store.dispatch(push('?search='+event.target.value))
      //this.props.activeRouteHandler({key: "test"})
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
      store.dispatch(push('/search'))
      //history.push('/search')
    }
    handleClick() {
    this.setState({
        open: !this.state.open
    });
}
    render() {
        return (
            <div className="EpsilonStreamPage">
                <Navbar color="danger" expand="md">
                    <NavbarBrand href="/"><ProductButton />EpsilonStream Beta</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    {
                        this.props.hassearch ?
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="w-100" navbar>
                                {/*<LeftButton />*/}
                                {/*<RightButton />*/}
                                <Form inline className="w-100">
                                    <Input  type="text" className="w-50 ml-auto"
                                            name="search" placeholder="Search"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            list="search-autocomplete" />
                                    <datalist id="search-autocomplete">
                                        {this.props.autoCompleteList.map(function (string, index) {
                                            return <option value={string} />
                                        })}
                                    </datalist>
                                    {/*<SearchButton />*/}
                                    <SurpriseButton />
                                    <HomeButton />
                                </Form>
                            </Nav>
                        </Collapse>
                        : ""
                    }
                    <SettingsButton />
                </Navbar>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchString: state.user.cleanSearchString,
        autoCompleteList: state.user.autoCompleteList
    };
};

export default connect(mapStateToProps)(EpsilonStreamPage);
