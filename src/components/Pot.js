import React, { Component } from 'react';

export class Pot extends Component {
    
    state={
        currentPot: 0
    }
  
    constructor(props){ 
        super(props);
        this.whale = this.props.whale;
        this.web3 = this.props.web3;
        this.running = this.props.running;
        this._newentrantlistener = null;
        this._listenernewwinner = null;
    }


    componentDidMount = async () =>{
        if(this.running){
            /* get Current pot and set state */
           this.getCurrentPot();

           /* set listener for new entrant and get new pot */
           this._newentrantlistener = this.whale.events.NewEntrant().on('data', event => this.getCurrentPot(event));

            /* Setup event listener to update state when whale ends */
            this._listenernewwinner = this.whale.events.NewWhale().on('data', event => this.handleNewWinner(event));

        }

    }

    componentWillUnmount = async () => {
        this._newentrantlistener.unsubscribe();
        this._listenernewwinner.unsubscribe();
    }

    handleNewWinner = async(event) => {
        this.setState({currentPot: 0});
    }

    getCurrentPot = async () =>{
        const _currentPot = await this.whale.methods.currentPot().call();
        this.setState({currentPot: _currentPot});
    }

    render() {
        return (
            <div id="MakeAWhaleStats" className="flex"> 
                <div id="MakeAWhaleStatsHeader">
                    <h2 className="text_white small_text"> current pot </h2>
                    <h2 className="text_white big_text"> {this.web3.utils.fromWei(this.state.currentPot.toString(), 'ether')} eth</h2>

                </div>
            </div>

        );

  }
}

export default Pot;
