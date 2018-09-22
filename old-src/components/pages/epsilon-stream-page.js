// import React, { Component } from 'react';
// import { NavbarToggler,NavItem,Row,Col,Container,InputGroup,InputGroupAddon, Button, Navbar, Nav, NavbarBrand, Collapse, Input} from 'reactstrap';
// import { Tooltip, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// //import VerticalLogo from '../../assets/Vertical_logo_1_outlines@4x.png'
// import Icon from '../../assets/icon.png'
// //import SettingsImage from '../../assets/3dotsMenu.png'
// //import RightButtonImage from '../../assets/Right_Passive.png'
// //import LeftButtonImage from '../../assets/Left_Passive.png'
// //import MediaQuery from 'react-responsive';
// import { withRouter } from 'react-router-dom'
// import { RingLoader } from 'react-spinners';
// import {connect} from 'react-redux'
// import {store} from '../../store.js'
// import {push} from 'react-router-redux'
// import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';

// import {SharePanel} from '../share-panel.js';
// import {SearchBar} from '../search-bar.js'


// class ShareButton extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             shareModal: false
//         };
//         this.toggle = this.toggle.bind(this);
//     }

//     toggle() {
//         this.setState({
//             shareModal: !this.state.shareModal
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <Button outline color="danger" onClick={(e) => {e.stopPropagation();this.toggle()}} id="globalShare" className="ml-sm-2 mr-sm-2">
//                     <p className = "text-white">
//                         Share
//                     </p>
//                 </Button>
//                 <Popover isOpen={this.state.shareModal} toggle={this.toggle} placement="bottom" target="globalShare">
//                     <PopoverHeader toggle={this.toggle}></PopoverHeader>
//                     <PopoverBody>
//                         <SharePanel shareURL="https://epsilonstream.com" shareType="none"/>
//                     </PopoverBody>
//                 </Popover>
//             </div>
//         )
//     }
// }

// const SettingsButton = withRouter(({history}) => (
//     <Button outline color="danger" className="ml-sm-2 mr-sm-2"
//         onClick={() => {history.push('/settings')}}>
//                                     <p className = "text-white">
//                                         Settings
//                                     </p>
//     </Button>
// ))

// const SearchButton = withRouter(({history}) => (
//     <Button outline color="danger" className="ml-sm-2 mr-sm-2"
//         onClick={() => {history.push('/search')}}>
//                                     <p className = "text-white">
//                                         Search
//                                     </p>
//     </Button>
// ))

// const AboutButton = withRouter(({history}) => (
//     <Button outline color="danger" className="ml-sm-2 mr-sm-2"
//         onClick={() => {window.open("https://oneonepsilon.com/epsilonstream", '_blank')}}>
//                                     <p className = "text-white">
//                                         About
//                                     </p>
//     </Button>
// ))

// const RegisterButton = withRouter(({history}) => (
//     <Button outline color="danger" className="ml-sm-2 mr-sm-2"
//         onClick={() => {window.open("https://oneonepsilon.com/register", '_blank')}}>
//                                     <p className = "text-white">
//                                         Register
//                                     </p>
//     </Button>
// ))

// export default class EpsilonStreamPage extends Component {
//     constructor(props) {
//       super(props);

//       this.toggle = this.toggle.bind(this);
//       this.state = {
//         isOpen: false,
//         value: ' ',
//         searchOn: false,
//         modal: true,
//         tooltipOpen: false
//       };
//       this.modalToggle = this.modalToggle.bind(this);
//       this.toolTipToggle = this.toolTipToggle.bind(this);
//     }

//     toggle() {
//       this.setState({
//         isOpen: !this.state.isOpen
//       });
//     }

//     toolTipToggle() {
//         this.setState({
//           tooltipOpen: !this.state.tooltipOpen
//         });
//       }
    

//       modalToggle() {
//         this.setState({
//           modal: !this.state.modal
//         });
//       }
    
//     handleClick() {
//         this.setState({
//             open: !this.state.open
//         });
//     }
  
//     render() {
//         return (
//             <div>{this.props.hideNav !== true ? 
//                 <Navbar className="navbar" color="danger" light expand="md" > 
//                     <NavbarBrand href="/home"> 
//                         <span>
//                             <img    className="productButton mr-sm-2" 
//                                     src={Icon} 
//                                     width={45}
//                                     alt = "ES"
//                                     id="ToolTipLogo"/>
//                             <p className = "text-white">
//                                 {this.props.headerString}
//                             </p>
//                         </span>
//                     </NavbarBrand>
//                     <NavbarToggler onClick={this.toggle} toggleable={"true"}/>
//                     <Collapse isOpen={this.state.isOpen} navbar>
//                         <Nav className="ml-auto" navbar>
//                             <NavItem>
//                                 {/*<ShareButton/>*/}
//                             </NavItem>
//                             <NavItem>
//                                 <SearchButton/>
//                             </NavItem>
//                             <NavItem>
//                                 <AboutButton/>
//                             </NavItem>
//                             <NavItem>
//                                 <RegisterButton/>
//                             </NavItem>
//                         </Nav>
//                     </Collapse>
//                 </Navbar>
//                 : ""}
//                 <div className = "background">
//                 <Container fluid={true} >
//                     <Row>
//                         <Col    xs={{ size: 12, order: 0, offset: 0}}
//                                 sm={{ size: 12, order: 0, offset: 0}} 
//                                 md={{ size: 12, order: 0, offset: 0}}
//                                 lg={{ size: 8, order: 0, offset: 2}}
//                                 xl={{ size: 8, order: 0, offset: 2}}
//                                 className="nopadding-lg">
//                             {false/*this.props.loadingInProgress*/ ?
//                                 <center>
//                                     <div className = "LoadContent">
//                                         <p> LOADING CONTENT </p>
//                                         <RingLoader/>
//                                         </div>
//                                 </center>
//                                 :
//                                 <div>
//                                     {<SearchBar startQuery={this.state.parsedQuery}/>}
//                                     {this.props.children}
//                                 </div>
//                             }    
//                         </Col>
//                     </Row>  
//                 </Container>   
//                 </div>  
//                 {this.props.betaPopUpCounter === 0 ?
//                     <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
//                         <ModalHeader toggle={this.modalToggle}>Epsilon Stream Web - Beta</ModalHeader>
//                         <ModalBody>
//                             This is the beta version of our Epsilon Stream Web-App. We are working hard to finalize it. If you have an iPhone or iPad, you may enjoy a free and fully functional <a href="https://itunes.apple.com/app/id1200152358"> iOS version</a> now. Otherwise, feel free to try out this Beta version. You may also register to give us feedback.
//                         </ModalBody>
//                         <ModalFooter>
//                                 {/*<Button color="primary" onClick={this.toggle}>Thanks</Button>*/}
//                                 {' '}
//                                 <Button color="primary" 
//                                         onClick={() => {this.toggle;
//                                                         window.open("https://oneonepsilon.com/epsilonstream", '_blank')}
//                                                     }>Register</Button>{' '}
//                         </ModalFooter>
//                     </Modal> 
//                     : ''}
//             </div>
//         );
//     }
// }


// //https://es-app.com/assets/anim/LogoAnimationVert_9sec.mp4

//                         /*<center>
//                             <video  width = "500"
//                                     height= "800" autoplay="" loop ="">
//                                     <source src ="https://people.smp.uq.edu.au/YoniNazarathy/LogoAnimationVert_9sec_High_Res.mp4"
//                                     type = "video/mp4"/>
//                                     Your browser does not support the video tag
//                             </video>
//                             */

// // const mapStateToProps = (state) => {
// //     return {
// //         searchString: state.user.cleanSearchString,
// //         loadingInProgress:  state.database.mathObjectsFetchInProgress       ||
// //                             state.database.mathObjectLinksFetchInProgress   ||
// //                             state.database.videosInProgress                 ||
// //                             state.database.snippetsFetchInProgress          ||
// //                             state.database.featuredURLsInProgress,
// //         headerString: ' ' + state.user.pageTitle,
// //         betaPopUpCounter: state.user.betaPopUpCounter
// //     };
// // };

// //export default connect(mapStateToProps)(EpsilonStreamPage);