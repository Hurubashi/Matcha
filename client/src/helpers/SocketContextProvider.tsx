import * as React from 'react'
import { SocketManager } from './SocketManager'

const ctxt = React.createContext<{ socket: SocketManager } | null>(null)

export const SocketContextProvider = ctxt.Provider

export const SocketContextConsumer = ctxt.Consumer
