import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'

function RegisterPage() {
  const history = useHistory()
  const newRegister = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  const [register, setRegister] = React.useState(newRegister)

  function handleInput(event) {
    const { name, value } = event.target
    setRegister({...register, [name]: value})
  }

  function NewRegister(e) {
    e.preventDefault()
    const first_name = register.first_name
    const last_name = register.last_name
    const email = register.email
    const password = register.password

    axios({
      method: 'POST',
      url: "http://localhost:3001/register",
      data: {
          first_name,
          last_name,
          email,
          password
      }
    })
      .then(response => {
        history.push('/Login')
      })
      .catch(e => console.log(e))
  }

  return (
    <div id="register-page" style={{borderRadius: '25px', width: '75%', margin: 'auto', marginTop: '75px'}} className="bg-light">
        <form id="register-form" style={{marginLeft: '20px', marginRight: '20px'}} onSubmit={NewRegister}>
          <h1 style={{textAlign: 'center'}}>Register</h1>
          <div className="row">
              <div className="col">
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" value={register.first_name} onChange={handleInput} className="form-control" name="first_name" id="create-first_name" placeholder="First Name" />
              </div>
              <div className="col">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" value={register.last_name} onChange={handleInput} className="form-control" name="last_name" id="create-last_name" placeholder="Last Name" />
              </div>
          </div>
          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" value={register.email} onChange={handleInput} name="email" id="create-email" className="form-control" placeholder="email" />
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" value={register.password} onChange={handleInput} name="password" id="create-password" className="form-control" placeholder="password" />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  );
}

export default RegisterPage