import React, { Component } from 'react';
import { CoinForm } from './CoinForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import { ResultsDisplay } from './ResultsDisplay'
import Axios from 'axios'
import { muiTheme, fabStyle } from './Styles'
import { ReferenceComponent } from './ReferenceComponent'
import { readPoloniexApi } from './ReadPoloniexApi'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import ProgressWaiter from './ProgressWaiter'

const poloniexUrl = 'https://poloniex.com/public?command=returnTicker'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fromCoin: "",
      toCoin: "",
      value: "",
      newVal: null,
      unitPrice: null,
      poloniexResponse: null,
      responseLoaded: false
    }
    this.updateResults = this.updateResults.bind(this)
    this.handleReverseClick = this.handleReverseClick.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  // read the ticker from Poloniex
  async fetchData() {
      try {
        this.setState({
          responseLoaded: false
        })
        const response = await Axios.get(poloniexUrl)
        const data = response.data
        this.setState({poloniexResponse: data, responseLoaded: true})
        this.updateResults()
      } catch (error) {
        alert("Error in retrieving Poloniex data: " + error)
      }
  }

  async componentDidMount() {
    await this.fetchData()

    // refresh every five minutes
    this.interval = setInterval(() => this.fetchData(), 300000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  // update results basd on poloniex Api
  updateResults() {
    if (this.state.responseLoaded) {
      var ApiResponse = readPoloniexApi({
                  toCoin: this.state.toCoin,
                  fromCoin: this.state.fromCoin,
                  value: this.state.value,
                  poloniexResponse: this.state.poloniexResponse
                })
      this.setState({
        newVal: ApiResponse.price,
        unitPrice: ApiResponse.unit
      })
    }
  }

  // reverse the from and tocoins
  handleReverseClick() {
    this.setState({fromCoin: this.state.toCoin, toCoin: this.state.fromCoin}, 
      () => this.updateResults())
  }
  
  render() {
    const loader = <ProgressWaiter loaded={this.state.responseLoaded}/>
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
	        	<AppBar
	        	title="Convertr"
						style={{ margin: 0 }}
	        	showMenuIconButton={false}
            iconElementRight={loader}>
            </AppBar>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>

            <FloatingActionButton style={fabStyle}
                onTouchTap={this.fetchData}>
              <NavigationRefresh />
            </FloatingActionButton>
            <CoinForm
              handleFromCoinChange={(newVal) => this.setState({fromCoin: newVal.toUpperCase()}, () => this.updateResults())}
              handleToCoinChange={(newVal) => this.setState({toCoin: newVal.toUpperCase()}, () => this.updateResults())}
              handleValueChange={(newVal) => this.setState({value: newVal}, () => this.updateResults())}
              handleReverseClick={this.handleReverseClick}/>
            <ResultsDisplay
              responseLoaded={this.state.responseLoaded}
              fromValue={this.state.value} fromCoin={this.state.fromCoin}
              toValue={this.state.newVal} toCoin={this.state.toCoin}
              unitPrice={this.state.unitPrice}
              refresh={this.fetchData}/>
            <ReferenceComponent />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
