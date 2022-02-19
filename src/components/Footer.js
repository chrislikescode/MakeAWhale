import Grid from '@mui/material/Grid/';
import React, { Component } from "react";
import {FaEthereum} from '@react-icons/all-files/fa/FaEthereum';
import {FaDigitalOcean} from '@react-icons/all-files/fa/FaDigitalOcean';
import {FaExpeditedssl} from '@react-icons/all-files/fa/FaExpeditedssl';
import {IconContext} from '@react-icons/all-files/';


class Header extends Component { 
    render() {
        return (
        <Grid  container spacing={4}>
            <Grid item md={3} >
            </Grid>
            <Grid item md={5} >
                <IconContext.Provider value={{color: "#6825E6", size: "50px" }}>
                <p className="footer-icons"> 
                    <span id="ethIcon"><a href="https://ethereum.org/en/" target="_blank" rel="noopener noreferrer"><FaEthereum/></a></span>
                    <span id="digitalOceanIcon"><a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer"><FaDigitalOcean/></a></span>
                    <span id="sslIcon"><a href="https://www.ssl.com/faqs/faq-what-is-ssl/" target="_blank" rel="noopener noreferrer"><FaExpeditedssl/></a></span>

                </p>
                </IconContext.Provider>
                <p className="text_white  disclaimer"> Disclaimer: </p>
                <p className="text_white  disclaimer"> 
                No person under the age of 18 are permitted to enter make a whale. Participating in make a whale is the responsibility of the individuals themselves.
                Users acknowledge that joining Make a Whale may expose them to financial risk, and are fully responsible for any losses incurred. There is no intention to induce any person to violate state, local or national laws.
                Its the sole responsibility of players to reference laws within their own jurisdiction to ascertain the legality of their actions. </p>
            </Grid>
            <Grid item md={4} >
            </Grid>
        </Grid>
        )
    }
}

export default Header;
