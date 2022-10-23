import { useEffect, useRef } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import SingleUserPage from './components/SingleUserPage'
import SingleBlogPage from './components/SingleBlogPage'

import loginService from './services/login'
import userService from './services/user'

import { setUser } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import UsersList from './components/UsersList'
import { Container } from 'react-bootstrap'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      userService.setUser(user)
      dispatch(notify(`${user.name} logged in!`))
    } catch(e) {
      dispatch(notify('wrong username/password', 'alert'))
    }
  }

  const HomePage = () => (
    <Container className='mx-4 mt-4'>
      <h2>List of blogs</h2>
      <Container className='mt-4'>
        <Togglable  buttonLabel='Add blog' ref={blogFormRef}>
          <NewBlogForm blogFormRef={blogFormRef}/>
        </Togglable>
        <BlogList />
      </Container>
    </Container>
  )

  const UserPage = () => (
    <Container className='mx-4 mt-4'>
      <h2>Users</h2>
      <UsersList />
    </Container>
  )

  const currentUser = useSelector(state => state.user)
  const blogFormRef = useRef(null)

  if (currentUser === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    )
  } else {
    return (
      <BrowserRouter>
        <NavigationBar />
        <h2 className='mt-4'>The Blog Enthusiast&apos;s App</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:id" element={<SingleUserPage />} />
          <Route path="/blogs/:id" element={<SingleBlogPage />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App