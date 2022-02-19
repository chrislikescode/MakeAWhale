import React, { Component } from "react";

class Timer extends Component { 
    
    state = { 
        endBlock: 0,
        currentBlock: 0,
        blocksLeft: 0,
        statusMessage: "",
        lightClass: 0,
        emoji: "🐋"
    };


    constructor(props){ 
        super(props);
        this.whale = this.props.whale;
        this.web3 = this.props.web3;
        this.running = this.props.running;
        this.blockInterval = null;
        this.lightClass = "off";
        this._listenernewwinner = null;
    }


    componentDidMount = async () => {
        
        /* Get Block and Time Information */
        let _endBlock = await this.whale.methods.endBlock().call();
        let _currentBlock = await this.web3.eth.getBlockNumber();
        let _blocksLeft = (_endBlock - _currentBlock);
        if(_blocksLeft > 0){
            _blocksLeft = _blocksLeft.toString();
        } else {
            _blocksLeft = 0;
           
        }
        
        /* Set Light Class and staus mesasage*/
        let _lightClass, _statusMessage;

        if(this.running){
            _lightClass = "on";
            _statusMessage = "Make a Whale ends on block ";

            /* if the current block is greater than the end block then the whale is ending */
            /* so set the status message to represent this change */
            if(_currentBlock >= _endBlock){
                _statusMessage = "Make a Whale Ending...";
                _endBlock  = "";
            }

        } else {
            _lightClass = "off";
            _statusMessage = "Make a Whale not running";
        }

         /* Set state to re-render */
         this.setState({
            endBlock: _endBlock, 
            currentBlock: _currentBlock, 
            blocksLeft: _blocksLeft, 
            statusMessage: _statusMessage,
            lightClass: _lightClass
        });

        /* Setup Block Interval to update blocks left in Make a Whale */
        this.blockInterval = setInterval(async () => {
            if(this.running){
                const _currentBlock = await this.web3.eth.getBlockNumber();
                let _blocksLeft = (_endBlock - _currentBlock);
                if(_blocksLeft < 0){
                    _blocksLeft = 0;
                    let _statusMessage = "Make a Whale Ending...";
                    let _endBlock  = "";
                    this.setState({
                        statusMessage: _statusMessage,
                        endBlock: _endBlock
                    });
                }
                this.setState({
                    currentBlock: _currentBlock, 
                    blocksLeft: _blocksLeft, 
                });
            }
        }, 5000);

        /* Setup event listener to update state when Make a Whale ends */
        this._listenernewwinner = this.whale.events.NewWhale().on('data', event => this.handleNewWinner(event));

           
    }

    handleNewWinner = async(event) => {
        const _currentBlock = await this.web3.eth.getBlockNumber();
        this.running = 0;
        this.setState({
            lightClass: "off",
            statusMessage: "Make a Whale not running",
            currentBlock: _currentBlock,
        });
    }

    componentWillUnmount = async () =>{
        clearInterval(this.blockInterval);
        this._listenernewwinner.unsubscribe();
    }

    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return 'Est time remaining: ' + hDisplay + mDisplay + sDisplay; 
    }

    render() {
        return(
            <div id="MakeAWhaleTimer" className="flex"> 
                <div id="MakeAWhaleTimerHeader">
                    <div id="MakeAWhaleTimerLight" className={this.state.lightClass}></div>
                    <h2 className="text_white med_text">blocks left</h2> 
                    <h2 className="text_white big_big_text"> <span>{this.running ? this.state.blocksLeft :  this.state.emoji} </span> </h2> 
                    <h2 className="text_white small_text"> {this.running ? this.secondsToHms(this.state.blocksLeft * 15) : ''}</h2> 
                    <h3 className="text_white small_text">{this.state.statusMessage} {this.running  ? this.state.endBlock : "" }</h3> 
                    <h3 className="text_white small_text">Current block: {this.state.currentBlock} </h3> 
                </div>
            </div>
        )
    }


   



}

export default Timer;