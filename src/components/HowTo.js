import React, { Component } from 'react';
import Grid from '@mui/material/Grid/';




export class HowTo extends Component {
  render() {
    return (
      <Grid item xs={12} md={12} lg={3}>
        <div>
        <h2> How To: </h2>
        <ol>
            <li> Install MetaMask and fill it with ETH </li>
            <li> Enter to make or become a whale !  Make a whale has to be running )  </li>
            <li> When block count reaches 0 and make a whale ends, click "check if I won button" ( light will be red ) </li>
            <li> If you won you will be able to click "withdraw funds" to receive your winnings </li>


        </ol>
        <h2> More info: </h2>
        <ul>
            <li> 15% of each pot will go to the contract for future dev, giveaways and more. </li>
            <li> Have feedback? Reach out in discord.  </li>
        </ul>
        </div>
      </Grid>
    
    );
  }
}

export default HowTo;
