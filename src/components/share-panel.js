import React from 'react';
//import {connect} from 'react-redux'
// import {CopyToClipboard} from 'react-copy-to-clipboard';

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


export default class SharePanel extends React.Component{ 

    shareString(url,type){
        switch(type){
            case "WATCH":
                return "I saw this great mathematics video on Epsilon Stream! Try it."
            default:
                return "I saw this cool thing on Epsilon Stream. Try it."
        }
    }

    render(){
        return(
            <div>
                <FacebookShareButton
                    url={this.props.shareURL}
                    quote={this.shareString(this.props.shareURL,this.props.shareType)}
                    className="Demo__some-network__share-button">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={this.props.shareURL}
                    title={this.shareString(this.props.shareURL,this.props.shareType)}
                    className="Demo__some-network__share-button">
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={this.props.shareURL}
                    quote={this.shareString(this.props.shareURL,this.props.shareType)}
                    className="Demo__some-network__share-button">
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <GooglePlusShareButton
                    url={this.props.shareURL}
                    quote={this.shareString(this.props.shareURL,this.props.shareType)}
                    className="Demo__some-network__share-button">
                    <GooglePlusIcon size={32} round />
                </GooglePlusShareButton>
                <WhatsappShareButton
                    url={this.props.shareURL}
                    quote={this.shareString(this.props.shareURL,this.props.shareType)}
                    className="Demo__some-network__share-button">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <EmailShareButton
                    url={this.props.shareURL}
                    quote={this.shareString(this.props.shareURL,this.props.shareType)}
                    className="Demo__some-network__share-button">
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
        )
    }
}

// {/* <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
// <PopoverHeader>Popover Title</PopoverHeader>
// <PopoverBody> */}
// </PopoverBody>
// </Popover>


/*const mapStateToProps = (state) => {
  return {
    stuffToShare: "QQQQ",
  };
};*/

//export default connect(mapStateToProps)(SharePanel);
// export default {SharePanel}


