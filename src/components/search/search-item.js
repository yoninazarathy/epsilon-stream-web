import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import getImageForKey from '../../managers/image-manager.js';
import { Media,Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { ProgressBar } from './progressbar.js';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import {SharePanel} from '../share-panel.js';

function guidGenerator() {
    // QQQQ fix this
    // aapeli, the lazy f*** did this.
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

class SearchItemUNROUTED extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shareModal: false,
            share_id: "a"+guidGenerator()
        };
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({
            shareModal: !this.state.shareModal
        });
    }

    render(){
        let image = getImageForKey(this.props.image, this.props.searchType)
        let classes = "SearchItem " + this.props.type
        return(
            <div className={classes} onClick={() => {this.props.action(this.props.link,this.props.history)}}>
                <div className="d-flex flex-row">
                    <div className="imagecontainer">
                        <img className="thumbimage" object src={image !== null ? image.src : ""} alt={image !== null ? image.alt : ""} />

                        {this.props.hasprogressbar ?
                        <ProgressBar completed={this.props.completed} />
                        : ""}
                    </div>
                    <div className="p-2 flex-grow-1">
                        <div className="d-flex flex-column flex-grow-1">
                            <div className="p-2 flex-grow-1">
                                {this.props.title}
                            </div>
                            <div className="p-2 mt-auto">
                                <div className="d-flex flex-row">
                                    <div className="p-2 flex-grow-1">
                                        {this.props.subtitle}
                                    </div>
                                    <div className="ml-auto">
                                        <Button color="link" onClick={(e) => {e.stopPropagation();this.toggle()}} id={this.state.share_id} className="sharebutton">Share</Button>
                                        <Popover isOpen={this.state.shareModal} toggle={this.toggle} placement="bottom" target={this.state.share_id}>
                                            <PopoverHeader toggle={this.toggle}>Share this...</PopoverHeader>
                                            <PopoverBody>
                                                <SharePanel shareURL={this.props.shareURL} shareType={this.props.type}/>
                                            </PopoverBody>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  }
  const SearchItem =  withRouter(SearchItemUNROUTED);
  export {SearchItem}



  /*
  <Container>
                    <Row>
                        <Col sm="2">
                            <Media left href="#">
                                <div className="media-container">
                                    <Media object src={image !== null ? image.src : ""} alt={image !== null ? image.alt : ""} />
                                </div>
                                {
                                    this.props.hasprogressbar ?
                                    <ProgressBar completed={this.props.completed} />
                                    : ""
                                }
                            </Media>
                        </Col>
                        <Col sm="10">
                            <Container>
                                <Row>
                                    <Col>
                                        <span className = "media-title">{this.props.title}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="auto">
                                        <span className="media-subtitle">{this.props.subtitle}</span>
                                    </Col>
                                    <Col sm="2">
                                        <Button color="link" onClick={this.toggle} id={this.state.share_id} className="sharebutton">Share</Button>
                                        <Popover isOpen={this.state.shareModal} toggle={this.toggle} placement="bottom" target={this.state.share_id}>
                                            <PopoverHeader toggle={this.toggle}>Share this...</PopoverHeader>
                                            <PopoverBody>
                                                <SharePanel />
                                            </PopoverBody>
                                        </Popover>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                */