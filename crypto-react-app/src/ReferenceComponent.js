import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

export const ReferenceComponent = () => {
  return (
    <Card style={{margin: 24}}>
      <CardTitle title="Reference"/>
      <CardText style={{fontSize: 16}}>
        <b>Bitcoin:</b> BTC<br/>
        <b>Ethereum:</b> ETH<br/>
        <b>LiteCoin:</b> LTC<br/>
        <b>US Dollar/Tether:</b> USD<br/>
      </CardText>
    </Card>
  )
}
