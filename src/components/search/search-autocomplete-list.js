import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Button} from 'reactstrap';
import updateSearchAction from '../../actions/update-search-action.js'

class SearchAutoCompleteList extends Component {
  render(){
    return(
        <div className="SearchAutoCompleteList">
            <ul>
              {this.props.autoCompleteList.map((item,i) => <li key={i}>
                <Button color="link" 
                        onClick={()=>{updateSearchAction(item)}}
                      >
                      {item}
                  </Button></li>)
                }
            </ul>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      autoCompleteList: state.user.autoCompleteList
    };
  };



export default connect(mapStateToProps)(SearchAutoCompleteList);
export {SearchAutoCompleteList}
