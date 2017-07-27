import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const ProgressWaiter = (props) => {
  return (
    <div>
        <div style={{display: 'flex', flex: 'row'}}>
          {props.loaded ? <p style={{color: "#ffffff"}}>Poloniex data is loaded</p> 
          	: <CircularProgress style={{marginRight: 8}}/>}
        </div>
    </div>
  )
}

export default ProgressWaiter