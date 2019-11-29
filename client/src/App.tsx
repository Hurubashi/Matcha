import React from 'react'
import Container from '@material-ui/core/Container'
import UserForm from './components/auth/UserForm'

export default function App() {
  return (
    <Container maxWidth="sm">
      <UserForm />
    </Container>
  )
}
