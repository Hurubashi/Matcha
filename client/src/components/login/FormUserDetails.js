import React, {Component} from "react"
import MuiThemeProvider from '@material-ui/core/styles/mui'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


class FormUserDetails extends Component{

	continue = e => {
		e.preventDefault()
		this.props.nextStep()
	}

	handleChange = e => {
		this.props.handleChange()
	}

	render() {
		const {values} = this.props
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="Enter User Details"/>
					<TextField
						hintText="Enter Your First Name"
						floatingLabelText="First Name"
						onChange={this.handleChange('firstName')}
						defaultValue={values.firstName}
					/>
					<br/>
					<TextField
						hintText="Enter Your Last Name"
						floatingLabelText="Last Name"
						onChange={this.handleChange('firstName')}
						defaultValue={values.lastName}
					/>
					<br/>
					<TextField
						hintText="Enter Your Email"
						floatingLabelText="Email"
						onChange={this.handleChange('firstName')}
						defaultValue={values.firstName}
					/>
					<br/>
					<Button
						variant="raised"
						label="Continue"
						primary={true}
						style={styles.button}
						onClick={this.continue}
					/>
				</React.Fragment>
			</MuiThemeProvider>
		)
	}

}

const styles = {
	button: {
		margin: 15
	}
}

export default FormUserDetails