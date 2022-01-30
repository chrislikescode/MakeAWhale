import React, { Component } from 'react';
import Button from '@mui/material/Button';


export class ConnectMetaMask extends Component {

    state={
        showButton: 1, 
    }
   
    constructor(props){
        super(props);
        this.web3 = this.props.web3;
        this.mmConnected = this.props.mmConnected;
    }

    componentDidMount = async () =>{
        this.setState({showButton: this.mmConnected});
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.mmConnected !== this.props.mmConnected){
            this.mmConnected = this.props.mmConnected;
        }
    }
   


  /* Event Handler to Connect to Meta Mask Manually */
    connectToMetaMask = async () => {
        try{
            await window.ethereum.enable();
            const _accounts = await this.web3.eth.getAccounts();
            localStorage.setItem('accounts', JSON.stringify(_accounts));
            localStorage.setItem('mm', 1);
            this.mmConnected = 1;
            this.setState({showButton: this.mmConnected});
        }catch(err){
            console.error(err);
        }
     }



  render() {
    return (
        <Button variant="contained" id="MetaMaskButton" className={this.state.showButton ? "hide" : ""}  onClick={this.connectToMetaMask}>Connect MetaMask</Button>
    );
  }
}

export default ConnectMetaMask;
