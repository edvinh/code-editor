import React from 'react'
import App from './App'
import Register from './Register'
import Stats from './Stats'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const Root = ({ isAuth }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <BrowserRouter>
      <div>
        <Route exact path="/" render={() => (isAuth ? <App /> : <Register />)} />
        <Route path="/stats" component={Stats} />
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
)

function mapStateToProps (state) {
  return {
    isAuth: !!state.team.accessToken,
  }
}

export default connect(mapStateToProps, null)(Root)
