import React, { Component } from "react";
import Grid from '@mui/material/Grid/';

import Timer from "./Timer.js";
import Pot from "./Pot.js";
import LastWinner from "./LastWinner.js";
import Enter from "./Enter.js";
import ConnectMetaMask from "./ConnectMetaMask.js";
import VaultButtons from "./VaultButtons.js";

class MakeAWhale extends Component { 

    constructor(props){
        super(props);
        this.whale = this.props.whale;
        this.winnervault = this.props.winnervault;
        this.web3 = this.props.web3;
        this.running = this.props.running;
        this.mmConnected = this.props.mmConnected;
    }

    componentDidUpdate(prevProps){
        if(prevProps.running !== this.props.running){
            this.running = this.props.running;
        }
    }
    
    render() {
        return( 
            <Grid item id="MakeAWhaleContainer" xs={12} sm={12} md={5}>
                <Timer whale={this.whale} web3={this.web3} running={this.running}></Timer>
                <Pot whale={this.whale} web3={this.web3} running={this.running}></Pot>
                <LastWinner whale={this.whale} web3={this.web3} running={this.running}></LastWinner>
                <Enter whale={this.whale} web3={this.web3} running={this.running}></Enter>
                <VaultButtons winnervault={this.winnervault} web3={this.web3} running={this.running}></VaultButtons>
                <ConnectMetaMask web3={this.web3} mmConnected={this.mmConnected}></ConnectMetaMask>
            </Grid>
            
        )
    }


}

export default MakeAWhale;