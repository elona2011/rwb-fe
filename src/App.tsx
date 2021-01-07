import React, { createContext, useContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import 'antd/dist/antd.css';
import Login from './pages/login/login'
import LoginUser from './pages/loginUser/loginUser'
import LayoutMain from './pages/layout'
import { ProvideAuth, PrivateRoute } from './pages/auth'
import { Spin, Space } from 'antd';
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false)
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    setLoading(true)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    setLoading(false)
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    setLoading(false)
    return Promise.reject(error);
  });
  return (
    // <BrowserRouter basename="/admin">
      <div className="App">
        <ProvideAuth>
          <Router>
            <div>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/loginuser">
                  <LoginUser />
                </Route>
                <PrivateRoute path="/user">
                  <LayoutMain />
                </PrivateRoute>
                <Route path="/">
                  <Redirect
                    to="/login"
                  />
                </Route>
              </Switch>
              {loading && (<div className="loading">
                <Spin size="large" />
              </div>)}
            </div>
          </Router>
        </ProvideAuth>
      </div>
    // </BrowserRouter>
  );
}

export default App;
