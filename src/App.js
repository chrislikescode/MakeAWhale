import React, { Component } from "react";
import LotteryContract from "./contracts/Lottery.json";
import LotteryVault from "./contracts/LotteryVault.json";
import getWeb3 from "./getWeb3";

/*styles*/
import "./App.css";


/*Components */ 

import Header from "./components/Header.js";
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
    try{ 

      // Get network provider and web3 instance of Lottery and LotteryVault.
      const _web3 = await getWeb3();

      if(_web3){
        console.log("componentDidMount if -> web3 not null");
        console.log(_web3);
        console.log("**********");

        try {
          const networkId = await _web3.eth.net.getId();
          const lotterynetwork = LotteryContract.networks[networkId];
          const _lottery = new _web3.eth.Contract( LotteryContract.abi, lotterynetwork.address);
          const lotteryvaultnetwork = LotteryVault.networks[networkId];
          const _lotteryvault = new _web3.eth.Contract( LotteryVault.abi, lotteryvaultnetwork.address);
          
          // check if lottery is running
          const _runninglot = await _lottery.methods.lotteryRunning().call();
        }  catch(err){
            console.error(err);
        }
      
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
    } catch(err){
      console.error(err);
    }
  };

  // handle situation where metamask disconnects but accounts and mm are still saved in local storage 
  // this is needed in order to reset the local storage and re set the state so the metamask button 
  // will re appear ... currently works ok.. not perfect because it requires 2 page refreshes (not end of world but
  // I'm not exactly sure why 2? ...
  postStateCallback = async () => {
    console.log("componentDidMount set state callback ")
    if(this.state.accounts.length > 0){
      console.log(" state accounts length is greater than 0")
      // try to get accounts - if not connected this will be an array length 0  
      const _accounts = await this.state.web3.eth.getAccounts(); 
      if(_accounts.length == 0){
        console.log("Account in Storage but Not Connected -- clear storage");
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
    console.log("RENDER ")
    console.log(web3State);
    console.log("****** ")

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
        
          <Grid item xs={12} md={3}>
            <HowTo/>
          </Grid>
        </Grid>
      </div>
      )
    }
  };
}

export default App;
