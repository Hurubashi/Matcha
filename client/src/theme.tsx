import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#FE5D26',
			// main: '#FE6B8B',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#ffbfa9',
		},
	},
	overrides: {
		MuiButton: {
			contained: {
				background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
				color: 'white',
			},
		},
		MuiDrawer: {
			paper: {
				backgroundColor: '#FE6B8B',
			},
		},
	},
})

export default theme
