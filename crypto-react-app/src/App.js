import React, { Component } from 'react';
import { CoinForm } from './Form'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppBar from 'material-ui/AppBar';
import { ResultsDisplay } from './ResultsDisplay'
import Axios from 'axios'
import { muiTheme } from './Styles'
import { ProgressWaiter } from './ProgressWaiter'
import { ReferenceComponent } from './ReferenceComponent'

const poloniexUrl = 'https://poloniex.com/public?command=returnTicker'

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fromCoin: "",
      toCoin: "",
      value: "",
      newVal: null,
      poloniexResponse: null,
      responseLoaded: false
    }
    this.updateResults = this.updateResults.bind(this)
    this.handleReverseClick = this.handleReverseClick.bind(this)
  }

  async componentDidMount() {
    try {
      const response = await Axios.get(poloniexUrl)
      const data = response.data
      this.setState({poloniexResponse: data, responseLoaded: true})
    } catch (error) {
      alert("Error in retrieving Poloniex data: " + error)
    }
  }

  updateResults() {
    var fromCoin = this.state.fromCoin
    var toCoin = this.state.toCoin
    var value = this.state.value
    if (toCoin !== "" && fromCoin !== "" && value !== "" && this.state.responseLoaded === true) { // check if the inputs are valid
      var poloResponse = this.state.poloniexResponse
      if (fromCoin === "USD") fromCoin = "USDT"
      if (toCoin === "USD") toCoin = "USDT"
      var price = poloResponse[toCoin + "_" + fromCoin]
      if (price !== null) { // check if there is a direct conversion
        this.setState({
          newVal: price.last * value
        })
      } else { // try with inverse conversion
        price = poloResponse[fromCoin + "_" + toCoin]
        if (price !== null) {
          this.setState({
            newVal: 1 / price.last
          })
        } else { // convert through BTC
          var priceFromBtc = poloResponse["BTC_" + fromCoin]
          var priceToBtc = poloResponse["BTC_" + toCoin]
          if (priceFromBtc !== null && priceToBtc !== null) {
            var fromBtc = priceFromBtc.last
            var toBtc = priceToBtc.last

            this.setState({
              newVal: fromBtc / toBtc
            })
          } else {
            this.setState({
              newVal: "Poloniex does not contain data"
            })
          }
        }
      }
    } else {
      this.setState({
        newVal: null
      })
    }
  }

  handleReverseClick() {
    this.setState({fromCoin: this.state.toCoin, toCoin: this.state.fromCoin}, () => this.updateResults())
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
	        	<AppBar
	        	title="Crypto Converter"
						style={{ margin: 0 }}
	        	showMenuIconButton={false}/>
          <div className="rowC">
            <CoinForm
              handleFromCoinChange={(newVal) => this.setState({fromCoin: newVal.toUpperCase()}, () => this.updateResults())}
              handleToCoinChange={(newVal) => this.setState({toCoin: newVal.toUpperCase()}, () => this.updateResults())}
              handleValueChange={(e, newVal) => this.setState({value: newVal}, () => this.updateResults())}
              handleReverseClick={this.handleReverseClick}/>
            <ResultsDisplay
              fromValue={this.state.value} fromCoin={this.state.fromCoin}
              toValue={this.state.newVal} toCoin={this.state.toCoin}/>
          </div>
          <ProgressWaiter loaded={this.state.responseLoaded} />
          <ReferenceComponent />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
