import React, {Component} from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';

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

    componentDidMount(){
        this.props.checkLogin();
    }

    render() {
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