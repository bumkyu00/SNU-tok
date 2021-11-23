import React, {Component} from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';

const Web3 = require('web3');
const url = "https://eth-ropsten.alchemyapi.io/v2/6xvB_IFEiLUg5uLrROiwjqj_nP-3qMBO"
const web3 = new Web3(url)

class Login extends Component {
    state={email:'', password:''}

    loginHandler(){
        if(this.state.email == 'swpp@snu.ac.kr' && this.state.password == 'iluvswpp'){
            this.props.onLogin();
            this.props.history.push('/articles');
        }
        else{
            alert('Email or password is wrong');
        }
    }

    render() {
        let address = "0xcACad72D9827f9C8DEbD75d7ec3b9D1Adf2354f2";
        web3.eth.getBalance(address).then(wei => {
            let balance = web3.utils.fromWei(wei, 'ether')
            console.log(balance);
        })
        return (
            <div className="Login">
                <dir>
                    <h1>Login Page</h1>
                    <label>Email:</label>
                    <input id="email-input" type="email" value={this.state.email}
                        onChange={(event) => this.setState({ email: event.target.value })}>
                    </input>
                </dir>
                <dir>
                    <label>Password:</label>
                    <input id="pw-input" type="password" value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}>
                    </input>
                </dir>
                <button id="login-button" onClick={() => this.loginHandler()}>Log in</button>
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
      onLogin: () => dispatch(actionCreators.login()),
      checkLogin: () => dispatch(actionCreators.checkLogin()),
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);