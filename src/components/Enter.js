import React, { Component } from 'react';
import Button from '@mui/material/Button';

export class Enter extends Component {

    state ={
      entreFee: '1' // needs to be a string
    }
    
    constructor(props){
        super(props);
        this.whale = this.props.whale;
        this.web3 = this.props.web3;
        this.running = this.props.running;
    }

    componentDidMount = async () => {
      const _entryFee = await this.whale.methods.entryFee().call();

      this.setState({entryFee: this.web3.utils.fromWei(_entryFee, 'ether')});
    }

    EnterHandler = async () => {
        try {
          const account = await this.web3.eth.getAccounts();
          await this.whale.methods.enter(account[0]).send({from: account[0], value:  this.web3.utils.toWei(this.state.entryFee) })
          .then(() =>{ 
            alert("You could become a whale. Good luck!")
          });
        }catch (err){
          console.error(err);
        }
    }


    render() {
        return(
            <div id="Enter" className="flex"> 
                <Button variant="contained" id="EnterButton" onClick={this.EnterHandler}>Make a Whale  : {this.state.entryFee} ETH</Button>
            </div>
        );
  }

}

export default Enter;
