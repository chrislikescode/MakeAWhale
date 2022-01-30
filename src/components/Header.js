import Grid from '@mui/material/Grid/';
import React, { Component } from "react";


class Header extends Component { 
    render() {
        return (
        <Grid  container spacing={4}>
            <Grid item xs={12} >
                <h1 className="MainHeader">THE CRYPTO LOTTERY</h1>
            </Grid>
        </Grid>
        )
    }
}

export default Header;
