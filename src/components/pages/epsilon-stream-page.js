import React, { Component } from 'react';
import { NavbarToggler,NavItem,Row,Col,Container,InputGroup,InputGroupAddon, Button, Navbar, Nav, NavbarBrand, Collapse, Input} from 'reactstrap';
import { Tooltip, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {connect} from 'react-redux'
import {SearchAutoCompleteList} from '../search/search-autocomplete-list'
import Icon from '../../assets/icon.png'
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {SearchBar} from '../search-bar.js'
import SharePanel from '../share-panel'

import Welcome from '../welcome.js'
import userHomeAction from '../../redux/actions/user-home-action';

class ShareButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareModal: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            shareModal: !this.state.shareModal
        });
    }

    render() {
        return (
            <div>
                <Button outline color="danger" 
                        onClick={(e) => {this.toggle()}} id="globalShare" className="ml-sm-2 mr-sm-2">
                    <p className = "text-white">
                        Share
                    </p>
                </Button>
                <Popover isOpen={this.state.shareModal} toggle={this.toggle} placement="bottom" target={"globalShare"}>
                    <PopoverBody>
                        <SharePanel shareURL={this.props.shareURL} shareType={"GENERIC"}/>                                          
                    </PopoverBody>
                </Popover>   
            </div>
        )
    }
}

const SettingsButton = props => ( //withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {history.push('/settings')}}>
                                    <p className = "text-white">
                                        Settings
                                    </p>
    </Button>
)//)

const AboutButton = props => ( //withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {window.open("https://oneonepsilon.com/epsilonstream", '_blank')}}>
                                    <p className = "text-white">
                                        About
                                    </p>
    </Button>
)//)

const RegisterButton = props => ( //withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {window.open("https://oneonepsilon.com/register", '_blank')}}>
                                    <p className = "text-white">
                                        Register
                                    </p>
    </Button>
)//)

class EpsilonStreamPageX extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        value: ' ',
        searchOn: false,
        modal: true,
        tooltipOpen: false
      };
      this.modalToggle = this.modalToggle.bind(this);
      this.toolTipToggle = this.toolTipToggle.bind(this);
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    toolTipToggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
      }
    

      modalToggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    
    handleClick() {
        this.setState({
            open: !this.state.open
        });
    }
  
    render() {
        return (
            <div> 
              <div className={"background" + (this.props.backgroundExtraClass ? " " + this.props.backgroundExtraClass : "")} />
            {this.props.hideNav !== true ? 
                <Navbar className="navbar" color="danger" light expand="md" > 
                    <NavbarBrand className="navbarBrand" onClick = {()=>{
                                                                        userHomeAction(this.props.history)
                                                                    }}> 
                        <span>
                            <img    className="productButton mr-sm-2" 
                                    src={Icon} 
                                    width={45}
                                    alt = "ES"
                                    id="ToolTipLogo"/>
                            <p className = "text-white">
                                {this.props.headerString}
                            </p>
                        </span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} toggleable={"true"}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <ShareButton shareURL = {this.props.currentURLforSharing}/>
                            </NavItem>
                            <NavItem>
                                <AboutButton/>
                            </NavItem>
                            <NavItem>
                                <RegisterButton/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                : ""}
                <div>
                <Container fluid={true} >
                    <Row>
                        <Col    xs={{ size: 12, order: 0, offset: 0}}
                                sm={{ size: 12, order: 0, offset: 0}} 
                                md={{ size: 12, order: 0, offset: 0}}
                                lg={{ size: 8, order: 0, offset: 2}}
                                xl={{ size: 8, order: 0, offset: 2}}
                                className="nopadding-lg">
                            { !this.props.hideSearch ?
                            <div className="searchBarWrapper">
                                { this.props.dbIsReady ?
                                        <React.Fragment>
                                            <SearchBar className="searchBar" startQuery={this.props.parsedQuery}/>
                                            {this.props.autoCompleteList.length > 0 ? <SearchAutoCompleteList /> : ''}
                                        </React.Fragment>
                                :
                                <span className="darkHorse">
                                    {   this.props.searchBarReplacementString ||
                                        this.props.networkError ||
                                        "Loading..."}
                                </span> }
                                </div>
                            : ""}
                            <div>
                                {this.props.needsDB && !this.props.dbIsReady ? 
                                    <Welcome/>
                                        :
                                    this.props.children
                                }
                            </div>
                        </Col>
                    </Row>  
                </Container>   
                </div>
                {false /*this.props.dbIsReady && this.props.betaPopUpCounter < 2*/  ?
                    <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>Epsilon Stream Web - Beta</ModalHeader>
                        <ModalBody>
                            This is the beta version of our Epsilon Stream Web-App. We are working hard to finalize it. If you have an iPhone or iPad, you may enjoy a free and fully functional <a href="https://itunes.apple.com/app/id1200152358"> iOS version</a> now. Otherwise, feel free to try out this Beta version. You may also register to give us feedback.
                        </ModalBody>
                        <ModalFooter>
                                {/*<Button color="primary" onClick={this.toggle}>Thanks</Button>*/}
                                {' '}
                                <Button color="primary" 
                                        onClick={() => {this.toggle;
                                                        window.open("https://oneonepsilon.com/register", '_blank')}
                                                    }>Register</Button>{' '}
                        </ModalFooter>
                    </Modal> 
                    : ''}
            </div>
        );
    }
}

//    <script dangerouslySetInnerHTML={{__html: "console.log(\"peek man\");window.onload = onLoadFunction"}} />



// export default EpsilonStreamPage;//connect(EpsilonStreamPage);


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
        /*searchString: state.user.cleanSearchString,
        loadingInProgress:  state.database.mathObjectsFetchInProgress       ||
                            state.database.mathObjectLinksFetchInProgress   ||
                            state.database.videosInProgress                 ||
                            state.database.snippetsFetchInProgress          ||
                            state.database.featuredURLsInProgress,*/
        headerString: state.user.pageTitle === undefined ? 'Epsilon Stream' : ' ' + state.user.pageTitle,
        currentURLforSharing: state.user.currentURLforSharing,
        betaPopUpCounter: state.user.betaPopUpCounter,
        autoCompleteList: state.user.autoCompleteList,
        dbIsReady: state.database.dbIsReady,
        dbLoadingInProgress: state.database.dbLoadingInProgress,
        networkError: state.database.errorState,
        hideNav: state.user.environment_ios_app,
        hideSearch: state.user.environment_ios_app
    };
};

const EpsilonStreamPage = connect(mapStateToProps)(EpsilonStreamPageX);
export default EpsilonStreamPage 