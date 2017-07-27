import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

export const ReferenceComponent = () => {
  return (
    <Card style={{margin: 24}}>
      <CardTitle title="Reference" subtitle="Convertr by Kevin Fang"/>
      <CardText style={{fontSize: 16}}>
        <p>This application calls the Poloniex API and downloads the ticker<br/> every five minutes or whenever the refresh button is clicked.</p>
        <p style={{fontSize: 14}}>Source code available on <a href='https://github.com/kevin-fang/crypto-calc/'>GitHub</a></p>
      </CardText>
    </Card>
  )
}
