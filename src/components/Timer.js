import React, { Component } from "react";

class Timer extends Component { 
    
    state = { 
        lotteryEndBlock: 0,
        currentBlock: 0,
        lotteryBlocksLeft: 0,
        statusMessage: "",
        lightClass: 0,
        emoji: "🐋"
    };


    constructor(props){ 
        super(props);
        this.lottery = this.props.lottery;
        this.web3 = this.props.web3;
        this.lotteryRunning = this.props.lotteryRunning;
        this.blockInterval = null;
        this.lightClass = "off";
        this._listenernewwinner = null;
    }


    componentDidMount = async () => {
        
        /* Get Block and Time Information */
        let _lotteryEndBlock = await this.lottery.methods.lotteryEndBlock().call();
        let _currentBlock = await this.web3.eth.getBlockNumber();
        let _lotteryBlocksLeft = (_lotteryEndBlock - _currentBlock);
        if(_lotteryBlocksLeft > 0){
            _lotteryBlocksLeft = _lotteryBlocksLeft.toString();
        } else {
            _lotteryBlocksLeft = 0;
           
        }
        
        /* Set Light Class and staus mesasage*/
        let _lightClass, _statusMessage;

        if(this.lotteryRunning){
            _lightClass = "on";
            _statusMessage = "Lottery ends on block ";

            /* if the current block is greater than the end block then the lottery is ending */
            /* so set the status message to represent this change */
            if(_currentBlock >= _lotteryEndBlock){
                _statusMessage = "Lottery Ending...";
                _lotteryEndBlock  = "";
            }

        } else {
            _lightClass = "off";
            _statusMessage = "Lottery not running";
        }

         /* Set state to re-render */
         this.setState({
            lotteryEndBlock: _lotteryEndBlock, 
            currentBlock: _currentBlock, 
            lotteryBlocksLeft: _lotteryBlocksLeft, 
            statusMessage: _statusMessage,
            lightClass: _lightClass
        });

        /* Setup Block Interval to update blocks left in lottery */
        this.blockInterval = setInterval(async () => {
            if(this.lotteryRunning){
                const _currentBlock = await this.web3.eth.getBlockNumber();
                let _lotteryBlocksLeft = (_lotteryEndBlock - _currentBlock);
                if(_lotteryBlocksLeft < 0){
                    _lotteryBlocksLeft = 0;
                    let _statusMessage = "Lottery Ending...";
                    let _lotteryEndBlock  = "";
                    this.setState({
                        statusMessage: _statusMessage,
                        lotteryEndBlock: _lotteryEndBlock
                    });
                }
                this.setState({
                    currentBlock: _currentBlock, 
                    lotteryBlocksLeft: _lotteryBlocksLeft, 
                });
            }
        }, 5000);

        /* Setup event listener to update state when lottery ends */
        this._listenernewwinner = this.lottery.events.LotteryWinner().on('data', event => this.handleLotteryEnd(event));

           
    }

    handleLotteryEnd = async(event) => {
        const _currentBlock = await this.web3.eth.getBlockNumber();
        this.lotteryRunning = 0;
        this.setState({
            lightClass: "off",
            statusMessage: "Lottery not running",
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
    
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return 'Est time remaining: ' + hDisplay + mDisplay + sDisplay; 
    }

    render() {
        return(
            <div id="LotteryTimer" className="flex"> 
                <div id="LotteryTimerHeader">
                    <div id="LotteryLight" className={this.state.lightClass}></div>
                    <h2 className="text_white med_text">blocks left</h2> 
                    <h2 className="text_white big_big_text"> <span>{this.lotteryRunning ? this.state.lotteryBlocksLeft :  this.state.emoji} </span> </h2> 
                    <h2 className="text_white small_text"> {this.lotteryRunning ? this.secondsToHms(this.state.lotteryBlocksLeft * 15) : ''}</h2> 
                    <h3 className="text_white small_text">{this.state.statusMessage} {this.lotteryRunning  ? this.state.lotteryEndBlock : "" }</h3> 
                    <h3 className="text_white small_text">Current block: {this.state.currentBlock} </h3> 
                </div>
            </div>
        )
    }


   



}

export default Timer;