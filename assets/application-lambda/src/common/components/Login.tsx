import * as React from 'react'

const Login = () => {
  return <div className="login-form">
    <form action='/auth/login' method='POST'>
      <input type='text' name='login'/>
      <input type='text' name='password'/>
      <input type='submit' value='Login'/>
    </form>
  </div>
}

export default Login
