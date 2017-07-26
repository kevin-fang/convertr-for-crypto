import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

export const ProgressWaiter = (props) => {
  return (
    <div style={{marginLeft: 48}}>
        <div className="rowC">
          <p>Loading...</p>
          <CircularProgress style={{marginLeft: 16}}/>
        </div>
    </div>
  )
}
