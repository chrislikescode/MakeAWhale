import React, { Component } from "react";
import MakeAWhaleContract from "./contracts/MakeAWhale.json";
import WinnerVault from "./contracts/WhaleWinnerVault.json";
import getWeb3 from "./getWeb3";

/*styles*/
import "./App.css";


/*Components */ 


import HeaderV2 from "./components/HeaderV2.js";
import Footer from "./components/Footer.js";
import MakeAWhale from "./components/MakeAWhale.js";
import EntrantsTable from "./components/EntrantsTable.js";
import HowTo from "./components/HowTo";
import NoWeb3 from "./components/NoWeb3";

import Grid from '@mui/material/Grid/';




class App extends Component {

  state = {
    running: 0, 
    WhaleContract: null,
    WinnerVault: null,
    mmConnected: JSON.parse(localStorage.getItem('mm')) || 0, 
    accounts: JSON.parse(localStorage.getItem('accounts')) || 0, 
    web3: null
  }

  componentDidMount = async () => {

    // Get network provider and web3 instance of MakeAWhaleContract and WinnerVault.
    const _web3 = await getWeb3();


    if(_web3 !== null){
      const networkId = await _web3.eth.net.getId();
      const makeawhalenetwork = MakeAWhaleContract.networks[networkId];
      const _makeawhalecontract = new _web3.eth.Contract( MakeAWhaleContract.abi, makeawhalenetwork.address);
      const winnervaultnetwork = WinnerVault.networks[networkId];
      const _winnervault = new _web3.eth.Contract( WinnerVault.abi, '0xc5C05190d405dAeaC7d2641Cc1546Ab97439d0c8');


      // can only check if MakeAWahel is running if we have an account to call from
      // SO, first we chek if we are. if we are, we check, if not, we assume the MakeAWhaleContract is not running.. ( maybe a better way to handle this )
      const mm_logged = await _web3.eth.getAccounts();
      const _runninglot = mm_logged.length > 0  ? await _makeawhalecontract.methods.running().call() : 0;


      // set state
      this.setState({ 
        web3: _web3, 
        WhaleContract: _makeawhalecontract, 
        WinnerVault: _winnervault,
        running: _runninglot
        }, this.postStateCallback);  
    } else {
      console.log("No web3 available, need to install MM");
    }
 
  };

  componentWillUnmount = async () => {
    window.ethereum.removeListener("accountsChanged", this.MetaMaskAccountChanged);
  }

  // handle situation where metamask disconnects but accounts and mm are still saved in local storage 
  // this is needed in order to reset the local storage and re set the state so the metamask button 
  // will re appear ... currently works ok.. not perfect because it requires 2 page refreshes (not end of world but
  // I'm not exactly sure why 2? ...
  postStateCallback = async () => {
    
    // setup account change listener 
    window.ethereum.on('accountsChanged', this.MetaMaskAccountChanged ); 
    

    if(this.state.accounts.length > 0){
      // try to get accounts - if not connected this will be an array length 0  
      const _accounts = await this.state.web3.eth.getAccounts(); 
      if(_accounts.length === 0){
        localStorage.removeItem('accounts');
        localStorage.removeItem('mm');
        this.setState({accounts: 0, mmConnected: 0});
      }
    }

  }

  MetaMaskAccountChanged = async () => {
    const _accounts = await this.state.web3.eth.getAccounts();
    localStorage.setItem('accounts', JSON.stringify(_accounts));
    this.setState({ accounts: _accounts })
  }
 
  /* Helper Methods for Accessing Local Storage */
  getLocalStorage(item){
    try{
      const x = JSON.parse(localStorage.getItem(item));
      return x;
    } catch(err){
      console.error(err);
    }
  }

  setLocalStorage(item, value){
    try{
      localStorage.setItem(item, value);
    } catch(err){
      console.error(err);
    }
  };


  


  render() {
    const web3State = this.state.web3;

    if(!web3State) {
      return <NoWeb3/>;
    } else {
      return (
      <div>
        <HeaderV2/>
        <Grid id="MakeAWhaleMainContent"container spacing={2} direction="row-reverse">
        
          <EntrantsTable 
          whale={this.state.WhaleContract}
          web3={this.state.web3}
            running={this.state.running}
            />
        
          <MakeAWhale
          whale={this.state.WhaleContract} 
          web3={this.state.web3} 
          running={this.state.running}
          mmConnected={this.state.mmConnected}
          winnervault={this.state.WinnerVault}
          />
        
          <HowTo/>

          <Footer/>
        </Grid>
      </div>
      )
    }
  };
}

export default App;
