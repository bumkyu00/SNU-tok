import React from 'react';
import ViewPage from './containers/viewPage';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import './App.css';

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/view' component={ViewPage}/>
            <Redirect exact apth='/' to='/view'/>
          </Switch>
        </BrowserRouter>
      </Web3ReactProvider>
    </div>
  );
}

export default App;