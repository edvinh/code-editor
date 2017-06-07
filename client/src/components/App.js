import React, { Component } from 'react'
import './App.css'

import TopBar from './TopBar'
import Drawer from './Drawer'
import OutputArea from './OutputArea'
import Editor from './Editor'

import * as viewActions from '../actions/viewActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {
  constructor () {
    super()
    this.onChange = this.onChange.bind(this)
    this.onPressRun = this.onPressRun.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.onCheck = this.onCheck.bind(this)

    this.state = {
      drawerOpen: false,
    }
  }

  onChange (newValue) {
    this.props.saveCode(newValue, this.props.lang)
  }

  toggleDrawer () {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  onPressRun () {
    this.props.compile(this.props.code[this.props.lang], this.props.lang)
  }

  onCheck (which, checked) {
    console.log(which, checked)
    switch (which) {
      case 'autocomplete':
        return this.props.toggleAutocomplete(checked)
      case 'liveAutocomplete':
        return this.props.toggleLiveAutocomplete(checked)
      case 'vim':
        return this.props.toggleVim(checked)
      default: 
        return null
    }
  }

  render() {
    return (
      <div className="App">
        <TopBar leftIconClick={this.toggleDrawer} onPressRun={this.onPressRun} loading={this.props.compiling} />
        <Drawer
          open={this.state.drawerOpen}
          toggle={this.toggleDrawer}
          lang={this.props.lang}
          setLang={this.props.changeLang}
          onCheck={this.onCheck}
          autocomplete={this.props.autocomplete}
          liveAutocomplete={this.props.liveAutocomplete}
          vim={this.props.vim}
        />
        <div className="leftDiv">
          <Editor
            onChange={this.onChange}
            code={this.props.code[this.props.lang]}
            lang={this.props.lang}
            autocomplete={this.props.autocomplete}
            liveAutocomplete={this.props.liveAutocomplete}
            vim={this.props.vim}
          />
        </div>
        <div className="rightDiv">
          <OutputArea output={this.props.output} />
        </div>
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
    vim: state.view.vim,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...viewActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


