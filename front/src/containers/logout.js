import React, {Component} from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';

class Logout extends Component {

    logoutHandler(){
        this.props.onLogout();
    }

    render() {
        return (
            <div className="Logout">
                {this.props.storedLogin && (<button id="logout-button" onClick={() => this.logoutHandler()}>Log out</button>)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedLogin: state.login.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onLogout: () => dispatch(actionCreators.logout()),
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Logout);