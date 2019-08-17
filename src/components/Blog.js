import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  const user = window
    .localStorage
    .getItem('loggedinUser')

  const handleClick = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  const handleLikes = (event) => {
    event.preventDefault()
    const likedBlog = { ...blog, likes: blog.likes += 1 }
    try {
      blogService.like(likedBlog.id, likedBlog)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`remove blog ${blog.title}`)) {
        blogService.remove(blog.id)
      }
    } catch (error) {
      console.log('error is: ', error)
    }
  }

  const showBlog = () => (
    <div className="blog-details">
      <a href={blog.url} rel="noopener noreferrer" target="_blank">
        {blog.url}
      </a>
      <p>
        {blog.likes} tykkäystä
        <button onClick={handleLikes}>
          like
        </button>
      </p>
      <p>
        Added by {blog.user.name}
      </p>
      {user && JSON.parse(user).name === blog.user.name ?
        <button onClick={handleRemove}>
          poista
            </button> :
        <p></p>
      }
    </div>

  )

  return (

    <div className='blog'>
      <p className='blog-button' onClick={handleClick}>
        {blog.title} {blog.author}
      </p>
      {showAll && showBlog()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog