import Grid from '@mui/material/Grid/';
import React, { Component } from "react";
import {FaDiscord} from '@react-icons/all-files/fa/FaDiscord';
import {FaTwitter} from '@react-icons/all-files/fa/FaTwitter';
import {IconContext} from '@react-icons/all-files/';


class Header extends Component { 
    render() {
        return (
        <Grid  container spacing={4}>
            <Grid item xs={12} >
                <h1 className="MainHeader">MAKE A WHALE.com</h1>
                <h2 className="SubMainHeader" > Whale:</h2>
                <IconContext.Provider value={{color: "#6825E6", size: "50px" }}>
                    <span id="discordIcon"><a href="https://discord.gg/b7y93Jxw" target="_blank"  rel="noopener noreferrer"><FaDiscord/></a></span>
                    <span id="twitterIcon"><a href="https://twitter.com/poseidonsnonce" target="_blank"  rel="noopener noreferrer"><FaTwitter/></a></span>
                </IconContext.Provider>
                <h2 className="MainDefinition"> someone who amasses a large portion of an existing asset while remaining anonymous.</h2>
                <h2 className="InspiredBy"> Inspired by : <a href="https://www.reddit.com/r/millionairemakers/"> millionairemakers ( reddit ) </a></h2>
                <blockquote>"If a million people gave a dollar to someone, they could be a millionaire."</blockquote>
            </Grid>
            <Grid item xs={12} >
                <h2 className="SubMainHeader" > What is makeawhale.com?</h2>
                <h2 className="text_white med_text description"> A random and peer-to-peer redistribution of wealth. More specficially, it is Decentralized Application (DAPP) on Ethereum that collects entry fees into a pot.
                When the lottery ends, a donor is chosen. This person  will then receive the total amount in the pot. </h2>

            </Grid>
        </Grid>
        )
    }
}

export default Header;
