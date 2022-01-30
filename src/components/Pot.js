import React, { Component } from 'react';

export class Pot extends Component {
    
    state={
        currentPot: 0
    }
  
    constructor(props){ 
        super(props);
        this.lottery = this.props.lottery;
        this.web3 = this.props.web3;
        this.lotteryRunning = this.props.lotteryRunning;
        this._newentrantlistener = null;
        this._listenernewwinner = null;
    }


    componentDidMount = async () =>{
        if(this.lotteryRunning){
            /* get Current pot and set state */
           this.getCurrentPot();

           /* set listener for new entrant and get new pot */
           this._newentrantlistener = this.lottery.events.NewEntrant().on('data', event => this.getCurrentPot(event));

            /* Setup event listener to update state when lottery ends */
            this._listenernewwinner = this.lottery.events.LotteryWinner().on('data', event => this.handleLotteryEnd(event));

        }

    }

    componentWillUnmount = async () => {
        this._newentrantlistener.unsubscribe();
        this._listenernewwinner.unsubscribe();
    }

    handleLotteryEnd = async(event) => {
        this.setState({currentPot: 0});
    }

    getCurrentPot = async () =>{
        const _currentPot = await this.lottery.methods.currentPot().call();
        this.setState({currentPot: _currentPot});
    }

    render() {
        return (
            <div id="LotteryStats" className="flex"> 
                <div id="LotteryStatsHeader">
                    <h2 className="text_white small_text"> current pot </h2>
                    <h2 className="text_white big_text"> {this.web3.utils.fromWei(this.state.currentPot.toString(), 'ether')} eth</h2>

                </div>
            </div>

        );

  }
}

export default Pot;
