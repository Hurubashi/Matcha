export type Gender = 'Male' | 'Female' | 'Not specified'
export type Preferences = 'Male' | 'Female' | 'Male & Female' | 'Not specified'

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
