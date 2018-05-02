import React, { Component } from 'react';
import { Row,Col,Container,InputGroup,InputGroupAddon, Button, Navbar, Nav, NavbarBrand, Collapse, Input} from 'reactstrap';
//import VerticalLogo from '../../assets/Vertical_logo_1_outlines@4x.png'
import Icon from '../../assets/icon.png'
//import SettingsImage from '../../assets/3dotsMenu.png'
import HomeImage from '../../assets/Home.png'
import Surprise1 from '../../assets/Surprise1.png'
//import RightButtonImage from '../../assets/Right_Passive.png'
//import LeftButtonImage from '../../assets/Left_Passive.png'
//import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom'
//import { RingLoader } from 'react-spinners';
import updateSearchAction from '../../actions/update-search-action.js'
import {connect} from 'react-redux'
import userHomeAction from '../../actions/user-home-action';
import {store} from '../../store.js'
//import {push} from 'react-router-redux'
import randomChoiceAction from '../../actions/random-choice-action.js'

const ProductButton = withRouter(({history}) => (
    <img    className="productButton mr-sm-2" 
            src={Icon} 
            width={45}
            onClick={() => {window.open("https://about.epsilonstream.com", '_blank')} } 
            alt = "ES"/>
))


const HomeButton = withRouter(({history}) => (
    <Button  color="danger" className="ml-sm-2 mr-sm-2"
        onClick={userHomeAction}>
        <img alt="home" src={HomeImage} width={30} height={30} />
    </Button>
))

/*
const SettingsButton = withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {history.push('/settings')}}>
        <img alt="settings" src={SettingsImage} width={30} height={30} />
    </Button>
))
*/

/*
const SearchButton = withRouter(({history}) => (
    <Button outline color="light" className="ml-sm-2"
        onClick={() => {history.push('/search')}}>
        Search
    </Button>
  ))
  */
  
  const SurpriseButton = withRouter(({history}) => (
    <Button color="danger" className="ml-sm-2 mr-sm-2"
        onClick={randomChoiceAction}>
        <img alt="surprise" src={Surprise1} width={30} height={30} />
    </Button>
  ))

class EpsilonStreamPage extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        value: ' '
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    handleClick() {
        this.setState({
            open: !this.state.open
        });
    }

    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        //event.preventDefault();
        //store.dispatch(push('/search'))
        //history.push('/search')
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



    render() {
        return (
            <div className="EpsilonStreamPage">
                <Container fluid={true} >
                    <Row>
                    <Col    xs={{ size: 12, order: 0, offset: 0}}
                            sm={{ size: 12, order: 0, offset: 0}} 
                            md={{ size: 12, order: 0, offset: 0}}
                            lg={{ size: 12, order: 0, offset: 0}}
                            xl={{ size: 9, order: 0, offset: 1}}
                            >
                        <Navbar color = "danger" light expand="md">
                            <NavbarBrand href="/" color = "white">
                            <ProductButton /> <p className = "text-white">Epsilon Stream Beta</p></NavbarBrand>
                        {/*<NavbarToggler onClick={this.toggle} />*/}
                            {
                                this.props.hassearch ?
                                <Collapse isOpen={true/*this.state.isOpen*/} navbar>
                                    <Nav className="w-100" navbar expand = "md">
                                        {/*<LeftButton />*/}
                                        {/*<RightButton />*/}
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
                                            {/*<SearchButton />*/}
                                    </Nav>
                                </Collapse>
                                : ""
                            }
                            {/*<SettingsButton/>*/}
                        </Navbar>
                        <div>
                            {this.props.loadingInProgress ?
                                <center>
                                    LOADING CONTENT
                                </center>
                                :         
                                this.props.children
                            }
                        </div>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
//https://es-app.com/assets/anim/LogoAnimationVert_9sec.mp4

                        /*<center>
                            <video  width = "500"
                                    height= "800" autoplay="" loop ="">
                                    <source src ="https://people.smp.uq.edu.au/YoniNazarathy/LogoAnimationVert_9sec_High_Res.mp4"
                                    type = "video/mp4"/>
                                    Your browser does not support the video tag
                            </video>
                            */

const mapStateToProps = (state) => {
    return {
        searchString: state.user.cleanSearchString,
        loadingInProgress:  state.database.mathObjectsFetchInProgress       ||
                            state.database.mathObjectLinksFetchInProgress   ||
                            state.database.videosInProgress                 ||
                            state.database.featuredURLsInProgress
    };
};

export default connect(mapStateToProps)(EpsilonStreamPage);
