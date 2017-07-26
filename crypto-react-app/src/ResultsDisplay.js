import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';

export class ResultsDisplay extends React.Component {

  render() {
    var fromTo = (this.props.fromCoin === "" ? "___" : this.props.fromCoin) + " to " + (this.props.toCoin === "" ? "___" : this.props.toCoin)
    return (
      <Card style={{margin: 24}}>
        <CardTitle title="Cryptocurrency Value" subtitle={fromTo}/>
        <CardText>
          <div style={{fontSize: 16, fontWeight: 'bold'}}>
            Amount of {this.props.fromCoin}:<br/>
          </div>
          <div style={{fontSize: 16}}>
            {this.props.fromValue}
          </div><br/>
          <div style={{fontSize: 16, fontWeight: 'bold'}}>
            Value in {this.props.toCoin}:<br/>
          </div>
          <div style={{fontSize: 16}}>
            {this.props.toValue}
          </div><br/>
        </CardText>
      </Card>
    )
  }
}
