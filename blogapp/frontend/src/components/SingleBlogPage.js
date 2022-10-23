import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Container } from 'react-bootstrap'

const SingleBlogPage = () => {
  const params = useParams()

  const blogs = useSelector(state => state.blogs)
  const currentBlog = blogs.find(blog => blog.id === params.id)

  if (!currentBlog) {
    return (
      null
    )
  }

  return (
    <Container className='mt-4 mx-4'>
      <h2>{currentBlog.title} - {currentBlog.author}</h2>
      <Blog blog={currentBlog}/>
    </Container>
  )
}
export default SingleBlogPage