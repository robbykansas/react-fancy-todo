import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import MainPage from './Components/MainPage'
import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import EditPage from './Components/EditPage'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/Register'>
            <RegisterPage />
          </Route>
          <Route path='/Edit/:id' component={withRouter(EditPage)}>
          </Route>
          <Route path='/Login'>
            <LoginPage />
          </Route>
          <Route path='/'>
            {localStorage.getItem('access_token') ? <MainPage /> : <Redirect to='/Login' />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
