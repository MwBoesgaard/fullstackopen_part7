import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h1>Welcome to The Blog Enthusiast&apos;s App</h1>
      <h2>Please login in to proceed</h2>

      <Form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>username</td>
            <td><input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              id='username'
            />
            </td>
          </tr>
          <tr>
            <td>password</td>
            <td>
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                id="password"
              />
            </td>
          </tr>
          <Button id="login-button" type="submit">
          login
          </Button>
        </table>
      </Form>
    </div>
  )
}

export default LoginForm