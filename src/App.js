import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Blogs = (props) => {
  return (
    props.blogs.map(b =>
      <Blog key={b.id} blog={b} />
    )
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage
      .getItem('loggedinUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
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
      console.log('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    console.log(`${user.name} logged out`)
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
          <input
          type="text"
          placeholder={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
          <input
          type="password"
          placeholder={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h3>Kirjaudu</h3>
        {loginForm()}
      </div>

    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} kirjautunut
      <button className="btn-logout" onClick={handleLogout}>
          logout
          </button>
      </p>
      <Blogs blogs={blogs} />

    </div>
  )
}

export default App
