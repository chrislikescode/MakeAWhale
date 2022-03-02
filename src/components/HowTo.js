import React, { Component } from 'react';
import Grid from '@mui/material/Grid/';




export class HowTo extends Component {
  render() {
    return (
      <Grid item xs={12} md={12} lg={3}>
        <div>
        <h2> How To: </h2>
        <ol>
            <li> Click "MAKE A WHALE". This is you entering. </li>
            <li> Once the block countdown is over, a entrant will be randomly selected.  </li>
            <li> Once ended ( off ) click "CHECK IF I WON" </li>
            <li> If you won you will be able to click "withdraw funds" to receive your winnings. </li>


        </ol>
        <h2> More info: </h2>
        <ul>
            <li> 15% of each pot will go to the contract for future dev, giveaways and more. </li>
            <li> Have feedback? Reach out in discord or twitter.  </li>
            <li> The Solidity contract is linked in the navigation on the left.   </li>

        </ul>
        </div>
      </Grid>
    
    );
  }
}

export default HowTo;
