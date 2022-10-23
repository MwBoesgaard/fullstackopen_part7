import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'

const CommentSection = ({ blog }) => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const [commentInput, setCommentInput] = useState('')

  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  const addComment = async (blog, commentInput) => {
    console.log(blog)

    setCommentInput('')
    const blogToComment = blogs.find(b => b.id === blog.id)
    const commentedBlog = {
      ...blogToComment,
      user: blog.user.id,
      comments: blog.comments.concat(commentInput)
    }

    console.log(commentedBlog)

    await blogService.addComment(commentedBlog.id, commentedBlog)

    dispatch(notify(`added comment '${commentInput}'`))

    const updatedBlogs = blogs
      .map(b => b.id===blog.id ? commentedBlog : b)
      .sort(byLikes)
    dispatch(setBlogs(updatedBlogs))
  }


  return (
    <div className='mt-4'>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
      <input onChange={({ target }) => setCommentInput(target.value)}></input><Button onClick={() => addComment(blog, commentInput)}>add comment</Button>
    </div>
  )
}
export default CommentSection