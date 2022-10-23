import { useEffect } from 'react'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {

  const dispatch = useDispatch()
  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs.sort(byLikes)))
    )
  }, [])

  const blogs = useSelector(state => state.blogs)

  return (
    <Table striped className='mt-4'>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`} key={blog.id}>
                {blog.title}
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default BlogList