import React from 'react'

const LoginForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div>
      <h3>Kirjaudu</h3>
      <form onSubmit={onSubmit}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            value={username}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm