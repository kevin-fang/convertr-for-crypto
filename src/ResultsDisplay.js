import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';

export class ResultsDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.getValueOrEmpty = this.getValueOrEmpty.bind(this)
  }

  getValueOrEmpty(property) {
    return property === "" ? "[coin]" : property
  }

  render() {
    var fromTo = this.getValueOrEmpty(this.props.fromCoin) + " to " + this.getValueOrEmpty(this.props.toCoin)
    return (
      <Card style={{margin: 24}}>
        <CardTitle title="Cryptocurrency Value" subtitle={fromTo}>
        </CardTitle>
        <CardText>
          <div style={{fontSize: 16}}>
            Unit price of {this.getValueOrEmpty(this.props.fromCoin)} in {this.getValueOrEmpty(this.props.toCoin)}:<br/>
          </div>
          <div style={{fontSize: 20}}>
            {this.props.unitPrice}<br/><br/>
          </div>
          <div style={{fontSize: 16}}>
            Amount of {this.getValueOrEmpty(this.props.fromCoin)}:<br/>
          </div>
          <div style={{fontSize: 24}}>
            {this.props.fromValue}<br/>
          </div><br/><br/>
          <div style={{fontSize: 16}}>
            Value in {this.getValueOrEmpty(this.props.toCoin)}:<br/>
          </div>
          <div style={{fontSize: 24}}>
            {this.props.toValue === "" || this.props.toValue === 0 ? "" : this.props.toValue}
          </div><br/>
       </CardText>
      </Card>
    )
  }
}
