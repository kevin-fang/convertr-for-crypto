import React from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

export class CoinForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleReverseClick = this.handleReverseClick.bind(this)
    this.handleFromCoinChange = this.handleFromCoinChange.bind(this)
    this.handleToCoinChange = this.handleToCoinChange.bind(this)
    this.state = {
      fromCoin: "",
      toCoin: ""
    }
  }

  handleReverseClick() {
    var fromCoin = this.state.fromCoin;
    var toCoin = this.state.toCoin;
    this.setState({
      fromCoin: toCoin,
      toCoin: fromCoin
    }, () => this.props.handleReverseClick())
  }



  handleFromCoinChange(e, newVal) {
    this.setState({fromCoin: e.target.value})
    this.props.handleFromCoinChange(newVal)
  }

  handleToCoinChange(e, newVal) {
    this.setState({toCoin: e.target.value})
    this.props.handleToCoinChange(newVal)
  }

  render() {
    return (
      <Paper style={{margin:24, padding: 8}}>
        <p style={{fontSize: 24, margin: 8}}>Input Conversion Values</p>
        <div style={{margin: 8}}>
          <TextField
            floatingLabelText="From"
            value={this.state.fromCoin}
            onChange={this.handleFromCoinChange}/><br/>
          <FlatButton label="Reverse" secondary={true}
            onClick={this.handleReverseClick}/><br/>
          <TextField
            floatingLabelText="To"
            value={this.state.toCoin}
            onChange={this.handleToCoinChange}/> <br/>
          <TextField
            floatingLabelText="Amount"
            onChange={this.props.handleValueChange} />
            <br/>
        </div>
      </Paper>
    )
  }
}
