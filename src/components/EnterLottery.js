import React, { Component } from 'react';
import Button from '@mui/material/Button';

export class EnterLottery extends Component {

    state ={
      entreFee: '1' // needs to be a string
    }
    
    constructor(props){
        super(props);
        this.lottery = this.props.lottery;
        this.web3 = this.props.web3;
        this.lotteryRunning = this.props.lotteryRunning;
    }

    componentDidMount = async () => {
      const _entryFee = await this.lottery.methods.entryFee().call();

      this.setState({entryFee: this.web3.utils.fromWei(_entryFee, 'ether')});
    }

    enterLotteryHandler = async () => {
        try {
          const account = await this.web3.eth.getAccounts();
          await this.lottery.methods.enter(account[0]).send({from: account[0], value:  this.web3.utils.toWei(this.state.entryFee) })
          .then(() =>{ 
            alert("You have Entered!")
          });
        }catch (err){
          console.error(err);
        }
    }


    render() {
        return(
            <div id="EnterLottery" className="flex"> 
                <Button variant="contained" id="EnterButton" onClick={this.enterLotteryHandler}>Enter Lottery  : {this.state.entryFee} ETH</Button>
            </div>
        );
  }

}

export default EnterLottery;
