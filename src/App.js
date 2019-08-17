import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: null })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /*
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])
  */

  useEffect(() => {
    const loggedUserJSON = window.localStorage
      .getItem('loggedinUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setMessage({ message, type })
    setTimeout(() => setMessage({ message: null }), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      console.log(`${user.name} logged in`)
    } catch (error) {
      setUsername('')
      setPassword('')
      notify('käyttäjätunnus tai salasana virheellinen', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedinUser')
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      onSubmit={handleLogin}
      onUsernameChange={({ target }) => setUsername(target.value)}
      onPasswordChange={({ target }) => setPassword(target.value)}
    />
  )



  /*
  const addBlog = async (newBlog) => {

    try {
      ref.current.toggleVisibility()
      const savedBlog =
        await blogService
          .create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      notify(`Lisätty uusi blogi ${savedBlog.author}'n ${savedBlog.title} `)

    } catch (error) {
      console.log(error)

    }
  }
*/
  const showBlogs = () => (
    <div>
      <p>{user.name} kirjautunut
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <Blogs />
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />

      {user === null && loginForm()}
      {user !== null && showBlogs()}
    </div>
  )
}

export default App
