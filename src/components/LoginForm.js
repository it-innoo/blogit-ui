import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div>
      <h3>Kirjaudu</h3>
      <form className='login-form' onSubmit={onSubmit}>
        <div>
          käyttäjätunnus
          <input {...username} />
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm