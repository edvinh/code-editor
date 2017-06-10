import React from 'react'
import App from './App'
import Register from './Register'
import Stats from './Stats'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from '../store'

const isAuthorized = !!localStorage.accessToken

// Goes to register if no auth token is present
const setView = (isAuth) => {
  return isAuth ? <App /> : <Register />
}

const Root = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <BrowserRouter>
            <div>
              <Route exact path="/" render={() => setView(isAuthorized)} />
              <Route path="/stats" component={Stats} />
            </div>
          </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default Root
