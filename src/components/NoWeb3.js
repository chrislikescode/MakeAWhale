import React, { Component } from 'react';
import Grid from '@mui/material/Grid/';
import Button from '@mui/material/Button';

import Header from './Header';
import HowTo from './HowTo';

export class NoWeb3 extends Component {


    downloadMetamask = async () => {
        window.open('https://metamask.io/');
    }



  render() {
    return (
        <div>
            <Header/>
            <Grid container spacing={2} direction="row-reverse">
                <Grid item xs={12} sm={12} md={3}>
                </Grid>
                <Grid item id="NoWeb3Item" xs={12} sm={12} md={6}>
                    <div id="NoWeb3Div" className="flex"> 
                        <h2 className="text_white big_text noweb3_text">Welcome to the Crypto Lottery!<span role="img" aria-label="whale" > 🐋 </span> </h2> 
                        <h2 className="text_white med_text noweb3_text">You will need a web3 enabled browser to use this app! Our recomendation, install the MetaMask extension.</h2> 
                        <Button variant="contained" id="MetaMaskDownload" onClick={this.downloadMetamask}>Download MetaMask</Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                 <HowTo/>
                </Grid>
            </Grid>
        </div>
    );
  }
}

export default NoWeb3;