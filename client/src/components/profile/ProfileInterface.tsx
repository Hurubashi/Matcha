export type Gender = 'male' | 'female' | ''
export type Preferences = 'male' | 'female' | 'male and female' | ''

export interface ProfileData {
	username: string
	email: string
	firstName: string
	lastName: string
	gender: Gender
	preferences: Preferences
	interests: string[]
	biography: string
}
