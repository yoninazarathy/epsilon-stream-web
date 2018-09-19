import React from 'react';
import {SearchItem} from './search-item.js'
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Snippet from '../snippet.js';

class SnippetSearchItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          src: 'https://www.aapelivuorinen.com/p.jpg'
        };

        this.toggle = this.toggle.bind(this);
        this.img = {src: "https://i.ytimg.com/vi/Htza-E2dQSY/mqdefault.jpg", alt: "alt"};
      }
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    
    render(){
        console.log()
        return(
            <div>
            <SearchItem searchType='SNIPPET'
                      type={this.props.type}
                      image={this.img}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      link={this.props.hashTag.substr(1)}
                      hasprogressbar={false}
                      noImage = {true}
                      action={this.props.action}
                      shareURL={"https://epsilonstream.com/snippet?mo="+encodeURIComponent(this.props.hashTag.substr(1))}>
            </SearchItem>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}> {this.props.title}</ModalHeader>
                  <ModalBody>
                      <Snippet mathObject={this.props.hashTag}/>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>OK</Button>
                </ModalFooter>
            </Modal>
            </div>
            )
    }
  }

  export default SnippetSearchItem;
