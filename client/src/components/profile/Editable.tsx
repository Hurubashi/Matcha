import {
	Box,
	Container,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel,
	TextField,
	Avatar,
	Card,
	Button,
	Typography,
	Grid,
} from '@material-ui/core'
import fields from './BasicFields'
import { ProfileData } from './ProfileInterface'

interface Props {
	changeProfileData: (prop: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => {}
	data: ProfileData
}

const Editable: React.FC<Props> = (props: Props) => {
	return (
		<Box>
			{fields.map(elem => {
				return (
					<TextField
						label={elem.name}
						onChange={props.changeProfileData(elem.key)}
						value={props.data[elem.key]}
						key={elem.key}
						fullWidth={true}
						margin='dense'
					/>
				)
			})}
		</Box>
	)
}

export default Editable
