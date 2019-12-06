import Cookie from 'js-cookie'

export const getJwt = () => {
  return Cookie.get('jwt')
  // if (jwt != 'none') {
  //   return jwt
  // } else {
  //   return false
  // }
}

// const Auth: React.FC<Props> = (props: Props) => {
//   const [user, setUser] = useState(props)

//   useEffect(() => {
//       effect
//       return () => {
//           cleanup
//       };
//   }, [input])s

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
