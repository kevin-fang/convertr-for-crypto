import getMuiTheme from 'material-ui/styles/getMuiTheme'

export const muiTheme = getMuiTheme({
	appBar: {
		height: 60,
    	color: '#66bb6a'
	},
  palette: {
    primary1Color: '#e57373'
  }
});

export const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};