import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getJwt } from './getJwt'

interface Props {
  path: string
  component: React.FC | React.ComponentType
}
const GuestRoute: React.FC<Props> = (props: Props) => {
  const [component] = useState(props)
  const token = getJwt()

  return token ? (
    <Redirect to='/profile' />
  ) : (
    <Route path={component.path} component={component.component} />
  )
}

export default GuestRoute
