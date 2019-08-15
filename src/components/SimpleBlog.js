import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
  return (
    <div>
      <div data-testid="blog">
        {blog.title} {blog.author}
      </div>
      <div data-testid="blogLikes">
        blog has {blog.likes} likes
        <button onClick={onClick}>like</button>
      </div>
    </div>
  )
}

export default SimpleBlog