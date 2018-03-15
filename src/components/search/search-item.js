import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import getImageForKey from '../../managers/image-manager.js';
import { Media, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { ProgressBar } from './progressbar.js';

class SearchItemUNROUTED extends React.Component{
    render(){
        let image = getImageForKey(this.props.image, this.props.searchType)
        let classes = "SearchItem " + this.props.type
        return(
            <div className={classes} onClick={() => {this.props.action(this.props.link,this.props.history)}}>
                <Media>
                    <Media left href="#">
                        <div className="media-container">
                            <Media object src={image.src} alt={image.alt} />
                        </div>
                        {
                            this.props.hasprogressbar ?
                            <ProgressBar completed={this.props.completed} />
                            : ""
                        }
                    </Media>
                    <Media body>
                        <Media heading>{this.props.title}</Media>
                        <br />
                        <span className="media-subtitle align-bottom">{this.props.subtitle}</span><br/>
                    </Media>
                </Media>
            </div>
        )
    }
  }
  const SearchItem =  withRouter(SearchItemUNROUTED);
  export {SearchItem}