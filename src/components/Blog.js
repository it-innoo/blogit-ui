import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = React.forwardRef(({ blog, ref }) => {
  const [showAll, setShowAll] = useState(false)
  console.log(`Blog ref: ${ref}`)

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

  const showBlog = () => (
    <div>
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
    </div>

  )

  return (

    <div className='blog'>
      <p onClick={handleClick}>
        {blog.title} {blog.author}
      </p>
      {showAll && showBlog()}
    </div>
  )
})

export default Blog