import React, { Component } from 'react';
import Grid from '@mui/material/Grid/';




export class HowTo extends Component {
  render() {
    return (
      <Grid item xs={12} md={3}>
        <div>
        <h2> How To: </h2>
        <ol>
            <li> Install MetaMask and fill it with ETH </li>
            <li> Enter lottery ( Lottery has to be running ) </li>
            <li> At the end block, a random entrant will be chosen ( all on blockchain ) </li>
            <li> The ETH will be sent to the Lottery Vault availble for that winner to withdraw. </li> 
            <li> If you win, click "withdraw funds" to receive your ETH </li> 


        </ol>
        <h2> Description: </h2>
        <ul>
            <li> 10% will go to the contract for further dev, giveaways and more. </li>
            <li> The vault is used for security purposes </li> 
            <li> you can check if you won by checking your balance in the vault -- click "Check my vault balance".
              If you have a balance, then you have won previously and you can withdraw at any time by clicking "Withdraw my funds"
            </li>

        </ul>
        </div>
      </Grid>
    
    );
  }
}

export default HowTo;
