import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import getImageForKey from './../../redux/managers/image-manager.js';
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

class SearchItemX extends React.Component{
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
        let image = getImageForKey(this.props.image, this.props.searchType);
        let classes = "SearchItem " + this.props.type
        return(
            <div className={classes} onClick={() => {this.props.action(this.props.link,this.props.history)}}>
                <div className="d-flex flex-row">
                    <div className="imagecontainer">
                        <img className={(this.props.hasprogressbar ? "thumbimage-pb" :
                                             "thumbimage")+" thumbimage-"+this.props.searchType.toLowerCase()}
                             src={image !== null ? image.src : ""}
                            alt={image !== null ? image.alt : ""} />
                        {this.props.hasprogressbar ?
                            <ProgressBar completed={this.props.completed} />
                            : ""}
                    </div>
                    <div className="p-2 d-flex flex-column flex-grow-1">
                        <div className="flex-grow-1">
                            <h5> {this.props.title}</h5>
                        </div>
                        <div className="mt-auto">
                            <div className="d-flex flex-row">
                                <div className="mt-auto flex-grow-1">
                                    {this.props.subtitle}
                                </div>
                                <div className="ml-auto">
                                    <Button outline color="secondary" onClick={(e) => {e.stopPropagation();this.toggle()}} id={this.state.share_id} className="sharebutton">Share</Button>
                             {/*       <Popover isOpen={this.state.shareModal} toggle={this.toggle} placement="bottom" target={this.state.share_id}>
                                        <PopoverHeader toggle={this.toggle}></PopoverHeader>
                                        <PopoverBody>
                                            <SharePanel shareURL={this.props.shareURL} shareType={this.props.type}/>
                                        </PopoverBody>
                        
                                    </Popover>   */}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export  const SearchItem =  withRouter(SearchItemX);