import React, { Component } from "react";
import Grid from '@mui/material/Grid/';

import Timer from "./Timer.js";
import Pot from "./Pot.js";
import LastWinner from "./LastWinner.js";
import EnterLottery from "./EnterLottery.js";
import ConnectMetaMask from "./ConnectMetaMask.js";
import VaultButtons from "./VaultButtons.js";

class Lottery extends Component { 

    constructor(props){
        super(props);
        this.lottery = this.props.lottery;
        this.lotteryvault = this.props.lotteryvault;
        this.web3 = this.props.web3;
        this.lotteryRunning = this.props.lotteryRunning;
        this.mmConnected = this.props.mmConnected;
    }

    componentDidUpdate(prevProps){
        if(prevProps.lotteryRunning != this.props.lotteryRunning){
            this.lotteryRunning = this.props.lotteryRunning;
        }
    }
    
    render() {
        return( 
            <Grid item id="LotteryContainer" xs={12} sm={12} md={5}>
                <Timer lottery={this.lottery} web3={this.web3} lotteryRunning={this.lotteryRunning}></Timer>
                <Pot lottery={this.lottery} web3={this.web3} lotteryRunning={this.lotteryRunning}></Pot>
                <LastWinner lottery={this.lottery} web3={this.web3} lotteryRunning={this.lotteryRunning}></LastWinner>
                <EnterLottery lottery={this.lottery} web3={this.web3} lotteryRunning={this.lotteryRunning}></EnterLottery>
                <VaultButtons lotteryvault={this.lotteryvault} web3={this.web3}></VaultButtons>
                <ConnectMetaMask web3={this.web3} mmConnected={this.mmConnected}></ConnectMetaMask>
            </Grid>
            
        )
    }


}

export default Lottery;