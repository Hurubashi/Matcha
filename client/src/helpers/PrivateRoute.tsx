import React, { useState, Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getJwt } from './getJwt'

interface Props {
  path: string
  component: React.FC
}
const PrivateRoute: React.FC<Props> = (props: Props) => {
  const [component, setComponent] = useState(props)
  const token = getJwt()

  return token ? (
    <Route path={component.path} component={component.component} />
  ) : (
    <Redirect to='/login' />
  )
}

export default PrivateRoute
