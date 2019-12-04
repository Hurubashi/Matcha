// import React, { Component, useState } from 'react'
// import axios from 'axios'

export const getJwt = () => {
  return localStorage.getItem('jwt')
}

// const Auth: React.FC<Props> = (props: Props) => {
//   const [user, setUser] = useState(props)

//   useEffect(() => {
//       effect
//       return () => {
//           cleanup
//       };
//   }, [input])

//     componentDidMount() {
//       const jwt = getJwt()
//       if (!jwt) {
//         console.log('JWT IS NOT SET')
//       }
//       axios
//         .post('/api/auth/login', {
//           headers: {
//             Authorization: `Bearer ${jwt}`
//           }
//         })
//         .then(res => {
//           this.setState({ user: res.data })
//         })
//         .catch(function(error) {
//           console.log('Error catched')
//           console.log(error)
//         })
//     }
//   return (
//     <div>
//       <p>Clicks: {user}</p>
//     </div>
//   )
// }
