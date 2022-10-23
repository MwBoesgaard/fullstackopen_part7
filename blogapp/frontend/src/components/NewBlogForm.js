import { useState } from 'react'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const NewBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const createBlog = async (blog) => {

    try {
      const createdBlog = await blogService.create(blog)
      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added`))
      dispatch(addBlog(createdBlog))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      dispatch(notify('creating a blog failed: ' + error))
    }
  }

  return (
    <div>
      <h3>Add blog</h3>

      <Form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>Title</td>
            <td><input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              id='title'
              placeholder='title of the blog'
            /></td>
          </tr>
          <tr>
            <td>Author</td>
            <td><input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              id='author'
              placeholder='author of the blog'
            /></td>
          </tr>
          <tr>
            <td>URL</td>
            <td><input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              id='url'
              placeholder='url of the blog'
            /></td>
          </tr>
          <Button variant="success" type='submit'>
          Add
          </Button>
        </table>
      </Form>
    </div>
  )
}

export default NewBlogForm