import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login'

function LoginPage() {
  const history = useHistory()
  const userLogin = {
    email: '',
    password: ''
  }

  const [user, setUser] = React.useState(userLogin)

  function handleInput(event) {
    const { name, value } = event.target
    setUser({...user, [name]: value})
  }

  function goRegister() {
    history.push('/Register')
  }

  function login(e) {
    e.preventDefault()
    const email = user.email
    const password = user.password
    axios({
      url: 'http://localhost:3001/login',
      method: 'POST',
      data: {
        email,
        password
      }
    })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        history.push('/')
      })
      .catch(e => console.log(e))
  }

  const responseGoogle = (response) => {
    var id_token = response.tokenId
    axios({
        url: 'http://localhost:3001/googleLogin',
        method: 'POST',
        data: {
            id_token
        }
    })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        history.push('/')
      })
      .catch(e => console.log(e))
  }

  return (
    <div id="login-page" className="bg-light" style={{borderRadius: '25px', width: '75%', margin: 'auto', marginTop: '75px'}}>
      <form id="login-form" style={{marginLeft: '20px', marginRight: '20px'}} onSubmit={login}>
        <h1 style={{textAlign: 'center'}}>Login Form</h1>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" name="email" id="email-input" placeholder="email" value={user.email} onChange={handleInput} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password " className="form-control" name="password" id="password-input" placeholder="password" value={user.password} onChange={handleInput} />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
        <button className="btn btn-outline-primary" onClick={goRegister}>Register</button>
      </form>
      <small style={{marginLeft: '20px', marginRight: '20px'}}>do you want to sign in with google?</small> <br />
      <GoogleLogin
        clientId="674490181502-ovrbag9cvjj170sr2fhudsf87d2np5ji.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default LoginPage