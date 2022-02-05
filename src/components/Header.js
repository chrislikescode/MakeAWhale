import Grid from '@mui/material/Grid/';
import React, { Component } from "react";
import {FaDiscord} from '@react-icons';
import {IconContext} from '@react-icons';


class Header extends Component { 
    render() {
        return (
        <Grid  container spacing={4}>
            <Grid item xs={12} >
                <h1 className="MainHeader">MAKE A WHALE.com</h1>
                <h2 className="SubMainHeader" > Whale:</h2>
                <IconContext.Provider value={{color: "#6825E6", size: "50px" }}>
                    <span id="discordIcon"><a href="https://discord.gg/b7y93Jxw"><FaDiscord/></a></span>
                </IconContext.Provider>
                <h2 className="MainDefinition"> someone who amasses a large portion of an existing asset while remaining anonymous.</h2>
                <h2 className="InspiredBy"> Inspired by : <a href="https://www.reddit.com/r/millionairemakers/"> millionairemakers ( reddit ) </a></h2>
                <blockquote>"If a million people gave a dollar to someone, they could be a millionaire."</blockquote>
            </Grid>
            <Grid item xs={12} >
                <h2 className="SubMainHeader" > What is makeawhale.com?</h2>
                <h2 className="text_white med_text description"> A DAPP Lottery on Ethereum that collects entry fees into a pot.
                When the lottery ends, a winner is chosen. This person receives the total amount in the pot. </h2>
            </Grid>
        </Grid>
        )
    }
}

export default Header;
