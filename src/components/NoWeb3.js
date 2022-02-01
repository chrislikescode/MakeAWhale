import React, { Component } from 'react';
import Grid from '@mui/material/Grid/';
import Button from '@mui/material/Button';



export class NoWeb3 extends Component {


    downloadMetamask = async () => {
        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en');
    }



  render() {
    return (
        <div>
            <Header/>
            <Grid item id="LotteryContainer" xs={12} sm={12} md={5}>
                <div className="flex"> 
                    <h2 className="text_white med_text">Welcome to the Crypto Lottery!</h2> 
                    <h2 className="text_white med_text">You will need a web3 enabled browser to use this app! </h2> 
                    <h2 className="text_white med_text">Our recomendation, install the MetaMask extension. </h2> 
                    <Button variant="contained" id="MetaMaskDownload" onClick={this.downloadMetamask}>Download MetaMask</Button>

                </div>
            </Grid>
        </div>
    );
  }
}

export default NoWeb3;
