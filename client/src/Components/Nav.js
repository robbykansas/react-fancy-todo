import React from 'react'
import { useHistory } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'

function Nav() {
  const history = useHistory()
  function logout(){
    localStorage.clear()
    history.push('/login')
  }
  return (
    <nav>
        <div style={{position: 'relative'}}>
        <GoogleLogout
          style={{top: '0', right: '12.5%'}} 
          clientId="674490181502-ovrbag9cvjj170sr2fhudsf87d2np5ji.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout>
        </div>
    </nav>
  )
}

export default Nav