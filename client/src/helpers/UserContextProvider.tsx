import * as React from 'react'
import { User } from '../reducers/UserReducer'
import { Action, State } from '../reducers/RequestReducer'

const ctxt = React.createContext<[State<User>, React.Dispatch<Action<User>>] | null>(null)

export const UserContextProvider = ctxt.Provider

export const UserContextConsumer = ctxt.Consumer
