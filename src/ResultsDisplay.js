import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';

export class ResultsDisplay extends React.Component {

  render() {
    var fromTo = (this.props.fromCoin === "" ? "___" : this.props.fromCoin) + " to " + (this.props.toCoin === "" ? "___" : this.props.toCoin)
    return (
      <Card style={{margin: 24}}>
        <CardTitle title="Cryptocurrency Value" subtitle={fromTo}>
        </CardTitle>
        <CardText>
          <div style={{fontSize: 16}}>
            Unit price of {this.props.fromCoin} in {this.props.toCoin}:<br/>
          </div>
          <div style={{fontSize: 20}}>
            {this.props.unitPrice}<br/><br/>
          </div>
          <div style={{fontSize: 16}}>
            Amount of {this.props.fromCoin}:<br/>
          </div>
          <div style={{fontSize: 24}}>
            {this.props.fromValue !== "" ? this.props.fromValue : <br/>}
          </div><br/><br/>
          <div style={{fontSize: 16}}>
            Value in {this.props.toCoin}:<br/>
          </div>
          <div style={{fontSize: 24}}>
            {this.props.toValue}
          </div><br/>
       </CardText>
      </Card>
    )
  }
}
