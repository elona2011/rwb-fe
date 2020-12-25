import React, { createContext, useContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import 'antd/dist/antd.css';
import Login from './pages/login'
import LayoutMain from './pages/layout'
import { ProvideAuth, PrivateRoute } from './pages/auth'

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                ccc
            </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/user">
                <LayoutMain />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
