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
            <li> Enter lottery ( Lottery has to be running )  </li>
            <li> When the lottery ends, click "check if I won button" ( light will be red ) </li>
            <li> If you won you will be able to click "withdraw funds" to receive your winnings </li>


        </ol>
        <h2> More info: </h2>
        <ul>
            <li> 10% will go to the contract for further dev, giveaways and more. </li>
            <li> We are currently in beta, if you would like to help join the discord</li>

        </ul>
        </div>
      </Grid>
    
    );
  }
}

export default HowTo;
