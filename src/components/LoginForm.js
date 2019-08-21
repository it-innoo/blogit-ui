import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  onPasswordChange,
  onSubmit,
}) => {
  const { reset, ...uname } = username
  const { type, value, onChange } = password
  const pwd = { type, value, onChange }

  return (
    <div>
      <h3>Kirjaudu</h3>
      <form className='login-form' onSubmit={onSubmit}>
        <div>
          käyttäjätunnus
          <input {...uname} />
        </div>
        <div>
          salasana
          <input {...pwd} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm