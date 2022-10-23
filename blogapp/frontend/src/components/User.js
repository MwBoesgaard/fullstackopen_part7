import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <>
      <div style = {{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
        <p>{user.blogs.length}</p>
      </div>
    </>
  )
}
export default User