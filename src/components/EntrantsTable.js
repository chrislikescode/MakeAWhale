import React, { Component } from 'react';
import Grid from '@mui/material/Grid/';


export class EntrantsTable extends Component {

    state={
        currentEntrants: []
    }

    constructor(props) {
        super(props);
        this.web3 = props.web3;
        this.accounts = props.accounts;
        this.lottery = props.lottery;
        this._listenernewentrant = null;
        this._listenernewwinner = null;
    };

    componentDidMount = async () => {
        try {
            /* Get Current Entrants and set state */
            this.getCurrentEntrants();

            /* Add listener to update table when new entrant */
            this._listenernewentrant = this.lottery.events.NewEntrant({fromBlock: "latest" }).on('data', event => this.handleNewEntrant(event));

            /* Add listener to clear table when lotteyr ends */
            this._listenernewwinner = this.lottery.events.LotteryWinner().on('data', event => this.handleLotteryEnd(event));

        } catch (err) {
            console.error(err);
        }
    };

    componentWillUnmount = async () => {
        this._listenernewentrant.unsubscribe();
        this._listenernewwinner.unsubscribe();
    }

    getCurrentEntrants = async () => {
        const _currentEntrants = await this.lottery.methods.getEntrantsArray(10, 0).call();
        if(_currentEntrants != null){
            this.setState({currentEntrants: _currentEntrants});
        }
    }

    
    handleNewEntrant = async(event) => {
        let newEntrant = this.web3.eth.abi.decodeParameter('address',event.raw.topics[1]);
        if(this.state.currentEntrants != null){ 
            let _joined = this.state.currentEntrants.concat(newEntrant);
            // only show last 10 entrants
            if(_joined.length > 10){
                _joined.shift();
            }
            this.setState({currentEntrants: _joined});
        } else {
            this.setState({currentEntrants: newEntrant});
        }
       
        
    }


    handleLotteryEnd = async(event) => {
        this.setState({currentEntrants: []});
    }

  render() {
    return(
        <Grid item xs={12} md={4}>
            <div className="EntrantsTableContainer">
                <h2 className="text_white">Last 10 Entrants</h2> 
                <div className="EntrantsTableDiv">
                    <table className="EntrantsTable">
                        <tbody>
                            {this.state.currentEntrants.length > 0 ? this.state.currentEntrants.slice(0).reverse().map(entrant =>< tr key={entrant}><td key={entrant}>{entrant}</td></tr>) : <tr><td> </td></tr> }
                        </tbody>
                    </table>
                </div>
            </div> 
        </Grid>

    );
  }
}


export default EntrantsTable;
