import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }

      setTitle('')
      setAuthor('')
      setUrl('')

      await onSubmit(newBlog)


    } catch (error) {
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log(error)
    }
  }

  const form = () => (
    <form onSubmit={handleSubmit}>
      <div>
        Otsikko
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        Kirjoittaja
          <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url
          <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <div>
        <button type="submit">Luo</button>
      </div>
    </form>
  )

  return (
    <div>
      <h3>Luo uusi</h3>
      {form()}
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm
