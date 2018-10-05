import React from 'react';
import {Button} from 'reactstrap';
import loadDbAction from '../redux/actions/reload-db-action'

const RegisterButton = props => ( //withRouter(({history}) => (
    <Button outline color="danger" className="ml-sm-2 mr-sm-2"
        onClick={() => {  loadDbAction();
                          window.open("https://oneonepsilon.com/register", '_blank')}}>
                                    <p className = "text-white">
                                        Register
                                    </p>
    </Button>
)//)



export default class Welcome extends React.Component{

  render(){
    return(
        <div>
          <p> Welcome to Epsilon World....</p>
        </div>
    )
  }
}

//  <RegisterButton/>
{/* <MaybeLater/> */}