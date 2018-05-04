import React from 'react';
import {SearchItem} from './search-item.js'
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Snippet from '../snippet.js';




class SnippetSearchItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
        };
    
        this.toggle = this.toggle.bind(this);
      }
    

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    

    render(){
        

        return(
            <div>
            <SearchItem searchType='EXPLORE'
                      type={this.props.type}
                      image={this.props.image}
                      title={"See the snippet about this object" /*this.props.title*/}
                      subtitle={this.props.subtitle}
                      link={this.props.link}
                      hasprogressbar={false}
                      noImage = {true}
                      action={this.toggle}>
            </SearchItem>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>QQQ</ModalHeader>
                            <ModalBody>
                                <Snippet mathObject = {"algebra"}/>
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
