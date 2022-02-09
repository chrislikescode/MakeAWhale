import React, { Component } from 'react';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export class VaultButtons extends Component {

    state = {
        open: false,
        value: 0,
    }


    constructor(props){
        super(props);
        this.lotteryvault = this.props.lotteryvault;
        this.web3 = this.props.web3;
        this.lotteryrunning = this.props.lotteryrunning;
    }

    componentDidUpdate(prevProps) {
        if(this.props.lotteryrunning !== prevProps.lotteryrunning){
            this.lotteryrunning = this.props.lotteryrunning;
        }
    }


    checkVaultBalance = async () => {
        try {
            const account = await this.web3.eth.getAccounts();
            const _value = await this.lotteryvault.methods.depositsOf(account[0]).call();
            if(_value > 0) {
                this.handleOpen(_value);
            } else{
                alert("You did not win")
            }
        } catch (err){
            console.error(err);
        }
    }
    
 
    handleOpen = (_value) => {
        this.setState({open: true, value: _value});  
    }

    handleClose = () => {
        this.setState({open: false});
    }

    withdrawWinnings = async () => { 
        try {
            const account = await this.web3.eth.getAccounts();
            await this.lotteryvault.methods.withdraw(account[0]).send({from: account[0]});
        } catch (err){
            console.error(err);
        }
    }


    render() {
    return(
        <div id="VaultButtons" className="flex"> 
            <Button variant="contained" id="CheckVaultButton" className="vaultbutton" onClick={this.checkVaultBalance}> Check if I won </Button>
       
        <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="winner-modal-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
            You won! {this.web3.utils.fromWei(this.state.value.toString(), 'ether')} ETH
             </Typography>
            <Button variant="contained" id="WithdrawWinnings" className="vaultbutton" onClick={this.withdrawWinnings}> Withdraw Winnings </Button>
            </Box>
        </Modal>
        </div>
    );
  }
}

export default VaultButtons;
