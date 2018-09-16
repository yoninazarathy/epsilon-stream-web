import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SettingsPage extends Component {
  render() {
    return (
        <EpsilonStreamPage>
          <Form>
            <FormGroup tag="fieldset" row>
              <legend className="col-form-label col-sm-4">Video Playing</legend>
              <Col sm={30}>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio2" />{' '}
                      On same tab.
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio2" />{' '}
                      In new tab.
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Clear History</Button>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Save Settings</Button>
              </Col>
            </FormGroup>
          </Form>
        </EpsilonStreamPage>
    );
  }
}

export default connect()(SettingsPage);