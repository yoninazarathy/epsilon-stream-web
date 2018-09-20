// import React from 'react';
// import {connect} from 'react-redux'
// import {CopyToClipboard} from 'react-copy-to-clipboard';

// import {
//   FacebookShareButton,
//   GooglePlusShareButton,
//   LinkedinShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   EmailShareButton,

//   FacebookIcon,
//   TwitterIcon,
//   WhatsappIcon,
//   GooglePlusIcon,
//   LinkedinIcon,
//   EmailIcon,  
// } from 'react-share';


// class SharePanel extends React.Component{
//   formattedMD: "" 
 
//   render(){
//     return(
//         <div>
//           {/*<Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
//             <PopoverHeader>Popover Title</PopoverHeader>
//     <PopoverBody>*/}
//     <div>
//                 <FacebookShareButton
//                     url={this.props.shareURL}
//                     quote={"Shared using Epsilon Stream"}
//                     className="Demo__some-network__share-button">
//                     <FacebookIcon size={32} round />
//                 </FacebookShareButton>
//                 <TwitterShareButton
//                     url={this.props.shareURL}
//                     title={"Shared using Epsilon Stream"}
//                     className="Demo__some-network__share-button">
//                     <TwitterIcon size={32} round />
//                 </TwitterShareButton>
//                 <LinkedinShareButton
//                     url={this.props.shareURL}
//                     quote={"Shared using Epsilon Stream"}
//                     className="Demo__some-network__share-button">
//                     <LinkedinIcon size={32} round />
//                 </LinkedinShareButton>
//                 <GooglePlusShareButton
//                     url={this.props.shareURL}
//                     quote={"Shared using Epsilon Stream"}
//                     className="Demo__some-network__share-button">
//                     <GooglePlusIcon size={32} round />
//                 </GooglePlusShareButton>
//                 <WhatsappShareButton
//                     url={this.props.shareURL}
//                     quote={"Shared using Epsilon Stream"}
//                     className="Demo__some-network__share-button">
//                     <WhatsappIcon size={32} round />
//                 </WhatsappShareButton>
//                 <EmailShareButton
//                     url={this.props.shareURL}
//                     quote={"Shared using Epsilon Stream"}
//                     className="Demo__some-network__share-button">
//                     <EmailIcon size={32} round />
//                 </EmailShareButton>
//                 </div>
//               {/*</PopoverBody>
//           </Popover>
//               */}
//         </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     stuffToShare: "QQQQ",
//   };
// };

// export default connect(mapStateToProps)(SharePanel);
// export {SharePanel}
