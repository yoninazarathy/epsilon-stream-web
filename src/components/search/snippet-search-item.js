import React from 'react';
import {SearchItem} from './search-item.js'
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Snippet from '../snippet.js';
import robotIcon from '../../assets/OneOnEpsilon-Character.png'



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
            <SearchItem searchType='Snippet'
                      type={this.props.type}
                      image={robotIcon}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      link={this.props.link}
                      hasprogressbar={false}
                      noImage = {true}
                      action={this.toggle}>
            </SearchItem>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}> {this.props.title}</ModalHeader>
                            <ModalBody>
                                <Snippet mathObject = {this.props.hashTag}/>
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
