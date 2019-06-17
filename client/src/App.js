import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor() {
    super();
    this.state = {
      users: []
    };
  }


  componentDidMount(){
    fetch('/api/users')
    .then(res => res.json())
    .then(users => this.setState({users: users}, 
      console.log('Users fetched...', users)))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Users</h2>
        <ul>
        {this.state.users.map(user => 
          <li key={user.id}>{user.firstName} {user.lastName}</li>
        )}
        </ul>
        </header>
      </div>
    )
  }
}

export default App
