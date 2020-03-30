interface BasicField {
	name: string
	key: 'username' | 'email' | 'firstName' | 'lastName'
}
const fields: BasicField[] = [
	{
		name: 'Username',
		key: 'username',
	},
	{
		name: 'Email',
		key: 'email',
	},
	{
		name: 'First Name',
		key: 'firstName',
	},
	{
		name: 'Last Name',
		key: 'lastName',
	},
]

export default fields
