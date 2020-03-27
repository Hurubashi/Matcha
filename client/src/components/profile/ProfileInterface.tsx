export type Gender = 'Male' | 'Female' | ''
export type Preferences = 'Male' | 'Female' | 'Male and Female' | ''

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
