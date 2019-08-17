import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

import Togglable from './Togglable'

import blogService from '../services/blogs'


const ref = React.createRef()

const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const addBlog = async (newBlog) => {

    try {
      ref.current.toggleVisibility()
      const savedBlog =
        await blogService
          .create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      //  notify(`Lisätty uusi blogi ${savedBlog.author}'n ${savedBlog.title} `)

    } catch (error) {
      console.log(error)

    }
  }

  const showBlogs = () => (
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map(b =>
        <Blog key={b.id} blog={b} />
      )
  )

  return (
    <div>


      <Togglable buttonLabel="Luo uusi" ref={ref}>
        <BlogForm onSubmit={addBlog} />
      </Togglable>

      {showBlogs()}
    </div >

  )
}

export default Blogs