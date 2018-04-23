import React from 'react';
import { Container, Row } from 'reactstrap';
import getImageForKey from '../../managers/image-manager.js';
import { Media } from 'reactstrap';
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
                            <Media object src={image !== null ? image.src : ""} alt={image !== null ? image.alt : ""} />
                        </div>
                        {
                            this.props.hasprogressbar ?
                            <ProgressBar completed={this.props.completed} />
                            : ""
                        }
                    </Media>
                    <Container>
                        <Row>
                            <span className = "media-title"> {this.props.title} </span>
                        </Row>
                        <Row>
                            <span className="media-subtitle">{this.props.subtitle}</span>
                        </Row>
                    </Container>
                </Media>
            </div>
        )
    }
  }
  const SearchItem =  withRouter(SearchItemUNROUTED);
  export {SearchItem}