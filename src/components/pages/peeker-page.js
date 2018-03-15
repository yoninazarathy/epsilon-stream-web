import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import startCloudPullAction from '../../actions/start-cloud-pull-action.js'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import {connect} from 'react-redux'
import TextList from '../text-list.js'
import { RingLoader } from 'react-spinners';
import {recordToShortString} from '../../managers/records-manager.js'




class PeekerPage extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
        <EpsilonStreamPage title="Peeker" hassearch={false}>
            <button className="refreshAction" onClick={this.props.resetDB}> Reset DB </button>
            <button className="fullPull" onClick={this.props.fullPullDB}>Full Pull you fucker</button>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  MathObjects  
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Math Object Links  
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Videos  
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                  Featured URLs  
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <button className="refreshFromCloud" 
                        onClick={this.props.updateMathObjects}> 
                  Refresh From Cloud
                </button>
                <RingLoader loading={this.props.mathObjectsFetchInProgress} />
                  <TextList data={this.props.mathObjects}></TextList>
              </TabPane>
              <TabPane tabId="2">
                <button className="refreshFromCloud" 
                        onClick={this.props.updateMathObjectLinks}> 
                  Refresh From Cloud
                </button>
                <RingLoader loading={this.props.mathObjectLinksFetchInProgress} />
                <TextList data={this.props.mathObjectLinks}></TextList>
              </TabPane>
              <TabPane tabId="3">
                <button className="refreshFromCloud" 
                          onClick={this.props.updateVideos}> 
                    Refresh From Cloud
                </button>
                <RingLoader loading={this.props.videosInProgress} />
                <TextList data={this.props.videos}></TextList>
              </TabPane>
              <TabPane tabId="4">
                <button className="refreshFromCloud" 
                        onClick={this.props.updateFeaturedURLs}> 
                  Refresh From Cloud
                </button>
                <RingLoader loading={this.props.featuredURLsInProgress} />
                <TextList data={this.props.featuredURLs}></TextList>
              </TabPane>
            </TabContent>
        </EpsilonStreamPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.user.counter,
    mathObjects: state.database.mathObjects.map(recordToShortString),
    mathObjectLinks: state.database.mathObjectLinks.map(recordToShortString),
    videos: state.database.videos.map(recordToShortString),
    featuredURLs: state.database.featuredURLs.map(recordToShortString),
    mathObjectsFetchInProgress: state.database.mathObjectsFetchInProgress,
    mathObjectLinksFetchInProgress: state.database.mathObjectLinksFetchInProgress,
    videosInProgress: state.database.videosInProgress,
    featuredURLsInProgress: state.database.featuredURLsInProgress   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetDB : () => dispatch({
      type : "RESET_DATABASE_STORE"
    }),
    fullPullDB : () => dispatch({
      type : "FETCH_FULL_PULL_START"
    }),
    updateMathObjects : () => dispatch({
      type : "FETCH_MATH_OBJECT_START"
    }),
    updateMathObjectLinks : () => dispatch({
      type : "FETCH_MATH_OBJECT_LINK_START"
    }),
    updateVideos : () => dispatch({
      type : "FETCH_VIDEO_START"
    }),
    updateFeaturedURLs : () => dispatch({
      type : "FETCH_FEATURED_URL_START"
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PeekerPage);
export {PeekerPage}