import React, { Component } from "react";
import LotteryContract from "./contracts/Lottery.json";
import LotteryVault from "./contracts/LotteryVault.json";
import getWeb3 from "./getWeb3";

/*styles*/
import "./App.css";


/*Components */ 


import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Lottery from "./components/Lottery.js";
import EntrantsTable from "./components/EntrantsTable.js";
import HowTo from "./components/HowTo";
import NoWeb3 from "./components/NoWeb3";

import Grid from '@mui/material/Grid/';


// check all contract variables and replace with lottery
// create instance of lotteryvault

class App extends Component {

  state = {
    lotteryRunning: 0, 
    lottery: null,
    lotteryvault: null,
    mmConnected: JSON.parse(localStorage.getItem('mm')) || 0, 
    accounts: JSON.parse(localStorage.getItem('accounts')) || 0, 
    web3: null
  }

  componentDidMount = async () => {

    // Get network provider and web3 instance of Lottery and LotteryVault.
    const _web3 = await getWeb3();

    if(_web3 !== null){
      const networkId = await _web3.eth.net.getId();
      const lotterynetwork = LotteryContract.networks[networkId];
      const _lottery = new _web3.eth.Contract( LotteryContract.abi, lotterynetwork.address);
      const lotteryvaultnetwork = LotteryVault.networks[networkId];
      const _lotteryvault = new _web3.eth.Contract( LotteryVault.abi, lotteryvaultnetwork.address);


      // can only check if lottery is running if we have an account to call from
      // SO, first we chek if we are. if we are, we check, if not, we assume the lottery is not running.. ( maybe a better way to handle this )
      const mm_logged = await _web3.eth.getAccounts();
      const _runninglot = mm_logged.length > 0  ? await _lottery.methods.lotteryRunning().call() : 0;

      // set state
      this.setState({ 
        web3: _web3, 
        lottery: _lottery, 
        lotteryvault: _lotteryvault,
        lotteryRunning: _runninglot
        }, this.postStateCallback);  
    } else {
      console.log("No web3 available, need to install MM");
    }
 
  };

  // handle situation where metamask disconnects but accounts and mm are still saved in local storage 
  // this is needed in order to reset the local storage and re set the state so the metamask button 
  // will re appear ... currently works ok.. not perfect because it requires 2 page refreshes (not end of world but
  // I'm not exactly sure why 2? ...
  postStateCallback = async () => {

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
        <Header/>
        <Grid container spacing={2} direction="row-reverse">
        
          <EntrantsTable 
          lottery={this.state.lottery}
          web3={this.state.web3}
            lotteryRunning={this.state.lotteryRunning}
            />
        
          <Lottery
          lottery={this.state.lottery} 
          web3={this.state.web3} 
          lotteryRunning={this.state.lotteryRunning}
          mmConnected={this.state.mmConnected}
          lotteryvault={this.state.lotteryvault}
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
