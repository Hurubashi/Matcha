import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'

export type Palette = 'light' | 'dark'
function getPalette(name: Palette): PaletteOptions {
	switch (name) {
		case 'light':
			return {
				primary: {
					main: '#FE5D26',
				},
				secondary: {
					main: '#19857b',
				},
				background: {
					default: '#fff',
				},
				text: {
					primary: '#1a191e',
				},
			}
		case 'dark':
			return {
				primary: {
					main: '#FE5D26',
				},
				secondary: {
					main: '#19857b',
				},
				background: {
					default: '#1a191e',
					paper: '#1a191e',
				},
				text: {
					primary: '#fff',
					secondary: 'rgba(255, 255, 255, 0.7)',
					disabled: 'rgba(255, 255, 255, 0.5)',
					hint: 'rgba(255, 255, 255, 0.5)',
				},
			}
	}
}

// nice grey #f5f5f5

const useTheme = (palette: Palette) => (): Theme => {
	const paletteOptions = getPalette(palette)
	return createMuiTheme({
		palette: paletteOptions,
		typography: {
			fontFamily: ['Roboto', 'Helvetica', 'Arial'].join(','), //'Dancing Script'
			fontSize: 13,
		},
		overrides: {
			MuiIconButton: {
				root: {
					color: '#fff',
					'&:hover': {
						backgroundColor: 'rgba(255, 255, 255, 0.19)',
					},
				},
			},
			MuiOutlinedInput: {
				notchedOutline: {
					borderColor: 'bisque',
				},
			},
			MuiButton: {
				contained: {
					background: 'linear-gradient(45deg, #FE5D26 30%, #FF8E53 90%)',
					color: 'white',
				},
				outlined: {
					color: '#fff',
					backgroundColor: '#1a191e',
					borderColor: '#fff',
				},
				root: {
					color: '#fff',
					'&:hover': {
						backgroundColor: '#49484a',
					},
				},
			},
			MuiChip: {
				root: {
					color: '#fff',
					backgroundColor: '#FE5D26',
				},
				outlined: {
					color: '#fff',
					backgroundColor: '#FE5D26',
				},
			},
			MuiPaper: {
				outlined: {
					borderColor: '#fff',
				},
			},
			MuiTypography: {
				h3: {
					fontFamily: 'Dancing Script',
					fontSize: '34px',
				},
			},
		},
	})
}

export default useTheme
