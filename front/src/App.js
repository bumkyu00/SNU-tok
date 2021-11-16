import React from 'react';
import Login from './containers/login';
import Logout from './containers/logout';
import Articles from './containers/articles';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';


function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Logout/>
      <div className="App">
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/articles' component={Articles}/>
          <Redirect from='/' to='/login'/>
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;