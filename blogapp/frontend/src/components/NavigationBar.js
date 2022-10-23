
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import userService from '../services/user'
import { Link } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'

const NavigationBar = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const logout = () => {
    dispatch(setUser(null))
    userService.clearUser()
    dispatch(notify('Goodbye!'))
  }

  return (
    <Navbar expand='sm' bg='dark' variant='light' style = {{ color: 'white', gap: 10 }}>
      <Link className='mx-4' to="/">Blogs</Link>
      <Link className='mx-4' to="/users">Users</Link>
      <div style={{ display: 'inline' }}>Welcome, {currentUser.name}</div> <Button variant="secondary" onClick={logout}>Logout</Button>
    </Navbar>
  )
}
export default NavigationBar