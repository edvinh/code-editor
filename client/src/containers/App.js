import React, { Component } from 'react'

import '../styles/App.css'

import TopBar from '../components/TopBar'
import Drawer from '../components/Drawer'
import OutputArea from '../components/OutputArea'
import Editor from '../components/Editor'
import Snackbar from 'material-ui/Snackbar'

import * as viewActions from '../actions/viewActions'
import * as socketActions from '../actions/socketActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {
  state = {
    drawerOpen: false,
    tab: 2,
    message: '',
  }

  componentDidMount () {
    this.props.subscribeToJoin(team => this.setState({ message: `Team ${team.name} has joined` }))

    this.props.subscribeToCompileError(team =>
      this.setState({ message: `Team ${team.name} got a compile error!` }))

    this.props.subscribeToBeverageFinish(team =>
      this.setState({ message: `Team ${team.name} finished their beverage!` }))
  }

  onChange = newValue => this.props.saveCode(newValue, this.props.lang)

  onFontChange = newValue => this.props.setFontSize(newValue)

  toggleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen })

  onPressRun = () =>
    this.props.compile(this.props.code[this.props.lang], this.props.lang, this.props.token)

  clearMessage = () => this.setState({ message: '' })

  onCheck = (which, checked) => {
    switch (which) {
      case 'autocomplete':
        return this.props.toggleAutocomplete(checked)
      case 'liveAutocomplete':
        return this.props.toggleLiveAutocomplete(checked)
      case 'vim':
        return this.props.toggleVim(checked)
      case 'notifications':
        return this.props.toggleNotifications(checked)
      default:
        return null
    }
  }

  render () {
    return (
      <div className="App">
        <TopBar
          leftIconClick={this.toggleDrawer}
          onPressRun={this.onPressRun}
          loading={this.props.compiling}
          title={this.props.name}
        />
        <Drawer
          open={this.state.drawerOpen}
          toggle={this.toggleDrawer}
          lang={this.props.lang}
          setLang={this.props.changeLang}
          onCheck={this.onCheck}
          onFontChange={this.onFontChange}
          fontSize={this.props.fontSize}
          tabSize={this.state.tab}
          autocomplete={this.props.autocomplete}
          liveAutocomplete={this.props.liveAutocomplete}
          notifications={this.props.notifications}
          vim={this.props.vim}
          finishedBeer={() => this.props.finishedBeer(this.props.token)}
          clearLocalStorage={() => {
            localStorage.clear()
            window.location.reload()
          }}
        />
        <div className="leftDiv">
          <Editor
            onChange={this.onChange}
            code={this.props.code[this.props.lang]}
            fontSize={this.props.fontSize}
            tabSize={this.state.tab}
            lang={this.props.lang}
            autocomplete={this.props.autocomplete}
            liveAutocomplete={this.props.liveAutocomplete}
            vim={this.props.vim}
          />
        </div>
        <div className="rightDiv">
          <OutputArea output={this.props.output} />
        </div>
        {this.props.notifications && (
          <Snackbar
            open={!!this.state.message}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.clearMessage}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    code: state.view.code,
    lang: state.view.lang,
    fontSize: state.view.fontSize,
    compiling: state.view.compiling,
    output: state.view.output,
    autocomplete: state.view.autocomplete,
    liveAutocomplete: state.view.liveAutocomplete,
    notifications: state.view.notifications,
    vim: state.view.vim,
    name: state.team.name,
    token: state.team.accessToken,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...viewActions, ...socketActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
