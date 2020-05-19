import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

import { resolve } from 'path'

import { config } from 'dotenv'

config({ path: resolve(__dirname, '../.env') })

ReactDOM.render(<App />, document.querySelector('#root'))
