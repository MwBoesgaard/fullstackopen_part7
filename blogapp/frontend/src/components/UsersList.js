import { Link } from 'react-router-dom'
import { useState } from 'react'
import user from '../services/user'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'


const UsersList = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      const users = await user.getAll()
      setUsers(users)
      console.log(users)
    }
    getUsers()
  }, [])

  if (!users) {
    return null
  }

  return (
    <Table>
      <tr>
        <td></td>
        <td>Blogs added</td>
      </tr>
      <>
        {users.map((user) => (
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </>
    </Table>
  )
}
export default UsersList
