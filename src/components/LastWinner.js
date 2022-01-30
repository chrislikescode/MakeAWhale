import React, { Component } from 'react';

import WinnerModal from './WinnerModal';

export class LastWinner extends Component {

    state = {
        lastWinner: ""
    }
    
    constructor(props){
        super(props);
        this.lottery = props.lottery;
        this.web3 = props.web3;
        this._listenerwinner = null;
    }



    componentDidMount = async () => {
        //get last winner and update state
        this.getLastWinner();

        // add event listener for a new winner to update UI without refresh  
        this._listenerwinner = this.lottery.events.LotteryWinner().on('data', event => this.handleUpdateLastWinner(event));
       
    }

    componentWillUnmount = async () => {
        this._listenerwinner.unsubscribe();
    }

    getLastWinner = async () => {
        const _lastWinner = await this.lottery.methods.LastWinner().call();
        this.setState({lastWinner: _lastWinner});
    }

    handleUpdateLastWinner = async (event) => {
        let _lastWinner = this.web3.eth.abi.decodeParameter('address',event.raw.topics[1]);
        this.setState({lastWinner: _lastWinner});
    }



  render() {
    return (
        <div>
            <WinnerModal lottery={this.lottery} web3={this.web3}/>
            <div id="LastWinnerContainer" className="flex"> 
                <div id="LastWinner" > 
                    <h2 className="text_white small_text"> Last Winner </h2>
                    <h2 className="text_white small_text"> {this.state.lastWinner}</h2>
                </div>
            </div>
        </div>

    );
  }
}

export default LastWinner;
