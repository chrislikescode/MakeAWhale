import React, { Component } from 'react';
import Button from '@mui/material/Button';


export class VaultButtons extends Component {

    constructor(props){
        super(props);
        this.lotteryvault = this.props.lotteryvault;
        this.web3 = this.props.web3;
    }


    checkVaultBalance = async () => {
        try {
            const account = await this.web3.eth.getAccounts();
            const value = await this.lotteryvault.methods.depositsOf(account[0]).call();
            alert(value);
        } catch (err){
            console.error(err);
        }
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
            <Button variant="contained" id="CheckVaultButton" className="vaultbutton" onClick={this.checkVaultBalance}> Check Vault Balance </Button>
            <Button variant="contained" id="WithdrawWinnings" className="vaultbutton" onClick={this.withdrawWinnings}> Withdraw Winnings </Button>
        </div>
    );
  }
}

export default VaultButtons;
