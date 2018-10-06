import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import getImageForKey from './../../redux/managers/image-manager.js';
import { Media,Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { ProgressBar } from './progressbar.js';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import SharePanel from '../share-panel.js';

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

        let displayTitle = this.props.title;
        if (typeof document !== 'undefined') {
            let allowableLength = 10;
            let body = document.getElementsByTagName('body')[0];
            let width = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
            let height = window.innerHeight|| document.documentElement.clientHeight|| body.clientHeight;
            if (width < 700) {
                allowableLength = 50;
            } else if (width < 1300) {
                allowableLength = 70;
            } else {
                allowableLength = 120;
            }
            if (allowableLength < displayTitle.length) {
                let numberOfTokens = this.props.title.substring(0, allowableLength).split(" ").length - 1;
                displayTitle = this.props.title.split(" ").slice(0, numberOfTokens).join(" ") + "...";
            }
        }
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
                    <div className="p-1 d-flex flex-column flex-grow-1">
                        <div className="flex-grow-1">
                            <span className="searchItemTitle">{displayTitle}</span>
                        </div>
                        <div className="mt-auto">
                            <div className="d-flex flex-row">
                                <div className="mt-auto flex-grow-1">
                                    {this.props.subtitle}
                                </div>
                                <div className="ml-auto">
                                    <Button outline color="secondary" onClick={(e) => {e.stopPropagation();this.toggle()}} id={this.state.share_id} className="sharebutton">Share</Button>
                                   <Popover isOpen={this.state.shareModal} toggle={this.toggle} placement="bottom" target={this.state.share_id}>
                                        <PopoverBody>
                                            <SharePanel shareURL={this.props.shareURL} shareType={this.props.searchType}/>                                               
                                        </PopoverBody>
                                    </Popover>   
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