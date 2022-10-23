import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import CommentSection from './CommentSection'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.user)

  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  const BlogDetails = ({ blog, likeBlog, removeBlog, own }) => {

    const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

    return (
      <div>
        <div>
          <a href={'https://' + blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
        </div>
        added by {addedBy}
        {own&&<Button onClick={() => removeBlog(blog.id)}>
          remove
        </Button>}
        <CommentSection blog={blog} />
      </div>
    )
  }

  const removeBlog = id => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs
        .filter(b => b.id!==id)
        .sort(byLikes)
      dispatch(setBlogs(updatedBlogs))
    })

    history.back()

  }

  const likeBlog = async (id) => {
    const toLike = blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes||0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      dispatch(notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`))
      const updatedBlogs = blogs
        .map(b => b.id===id ? updatedBlog : b)
        .sort(byLikes)
      dispatch(setBlogs(updatedBlogs))
    })
  }

  return (
    <div className='mt-2 mx-4'>
      <BlogDetails
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        own={blog.user && currentUser.username===blog.user.username}
      />
    </div>
  )
}

export default Blog