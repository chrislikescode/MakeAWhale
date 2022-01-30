import React, { Component } from "react";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export class WinnerModal extends Component {
  
  state = {
    open: false,
    winner: null,
  }

  constructor(props){
    super(props);
    this.lottery = props.lottery;
    this.web3 = props.web3;
    this._lotterywinnerlistener = null;
}

 
  componentDidMount = async () => {
     // add event listener for a new winner and display the modal 
     this._lotterywinnerlistener = this.lottery.events.LotteryWinner().on('data', event => this.handleOpen(event));
  }

  componentWillUnmount = async () => {
    this._lotterywinnerlistener.unsubscribe();
  }


  handleOpen = (event) => {
    this.setState({open: true, winner: this.web3.eth.abi.decodeParameter('address',event.raw.topics[1])});  
  }

  handleClose = () => {
    this.setState({open: false});
  }


  render() {
    return (
    <div>
    <Modal
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="winner-modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
           New Winner: {this.state.winner}
          </Typography>
        </Box>
      </Modal>
    </div>
    )
  }
}

export default WinnerModal;
