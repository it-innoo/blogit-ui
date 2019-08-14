import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  const showBlog = () => (
    <div>
      <a href={blog.url} rel="noopener noreferrer" target="_blank">
        {blog.url}
      </a>
      <p>
        {blog.likes} tykkäystä
        <button onClick={() => { }}>
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
}

export default Blog