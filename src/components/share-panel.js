import React from 'react';
import {connect} from 'react-redux'
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,

  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  EmailIcon,  
} from 'react-share';


class SharePanel extends React.Component{
  formattedMD: "" 
 
  render(){
    return(
        <div>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>
                  <FacebookShareButton
                    url={"epsilonstream.com/watch?v=ttt"}
                    quote={"Shared using Epsilon Stream"}
                    className="Demo__some-network__share-button">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={"https://epsilonstream.com/watch?v=ttt"}
                    title={"Shared using Epsilon Stream"}
                    className="Demo__some-network__share-button">
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={"epsilonstream.com/watch?v=ttt"}
                    quote={"Shared using Epsilon Stream"}
                    className="Demo__some-network__share-button">
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <GooglePlusShareButton
                    url={"epsilonstream.com/watch?v=ttt"}
                    quote={"Shared using Epsilon Stream"}
                    className="Demo__some-network__share-button">
                    <GooglePlusIcon size={32} round />
                </GooglePlusShareButton>
                <WhatsappShareButton
                    url={"epsilonstream.com/watch?v=ttt"}
                    quote={"Shared using Epsilon Stream"}
                    className="Demo__some-network__share-button">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <EmailShareButton
                    url={"epsilonstream.com/watch?v=ttt"}
                    quote={"Shared using Epsilon Stream"}
                    className="Demo__some-network__share-button">
                    <EmailIcon size={32} round />
                </EmailShareButton>
              </PopoverBody>
          </Popover>

        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stuffToShare: "QQQQ",
  };
};

export default connect(mapStateToProps)(Snippet);
export {SharePanel}
