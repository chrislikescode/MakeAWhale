import Grid from '@mui/material/Grid/';
import React, { Component } from "react";



class Header extends Component { 
    render() {
        return (
        <Grid  container spacing={4}>
            <Grid item md={3} >
            </Grid>
            <Grid item md={5} >
                <p className="text_white  disclaimer"> Disclaimer: </p>
                <p className="text_white  disclaimer"> 
                No person under the age of 18 are permitted to play the games. Participating in the games is the responsibility of the individuals themselves.
                Users acknowledge that playing the games may expose them to financial risk, and are fully responsible for any losses incurred. There is no intention to induce any person to violate state, local or national laws.
                Its the sole responsibility of players to reference laws within their own jurisdiction to ascertain the legality of their actions. </p>
            </Grid>
            <Grid item md={4} >
            </Grid>
        </Grid>
        )
    }
}

export default Header;
