import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';
import PrivateRoute from './PrivateRoute';

export const UserContext = React.createContext();

const USER = 'user';

function App() {
  const [user, setUser] = useState(localStorage.getItem(USER))

  const logout = () => {
    localStorage.setItem(USER, '')
    setUser('')
  }

  const authenticate = () => {
    localStorage.setItem(USER, true)
    setUser(true)
  }

  return (
    <UserContext.Provider value={{user, logout, authenticate}}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route path="/signup" component={Registration} />
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
