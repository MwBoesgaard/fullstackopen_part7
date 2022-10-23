import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

const SingleUserPage = () => {
  const params = useParams()

  const blogs = useSelector(state => state.blogs)
  const userBlogs = blogs.filter(blog => blog.user.id === params.id)

  if (!userBlogs) {
    return (
      null
    )
  }

  return (
    <Container>
      <h2 className='mx-4 mt-4'>{userBlogs[0].user.name}</h2>
      <Container className='mx-4 mt-4'>
        <h3>Added blogs</h3>
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </Container>
    </Container>
  )
}
export default SingleUserPage