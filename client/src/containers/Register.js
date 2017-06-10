import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import '../styles/Register.css'
import * as registerActions from '../actions/registerActions'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
    }
  }

  render() {
    return (
      <div className="registerWrapper">
        <h1>CRASH & COMPILE</h1>
        <h2>REGISTER A TEAM</h2>
        <TextField className="teamInput"
          floatingLabelText="Team Name"
          fullWidth
          onChange={(evt, val) => this.setState({ name: val })}
        />
        <br />
        <RaisedButton
          label="Register"
          disabled={!this.state.name}
          primary
          className="registerBtn"
          onTouchTap={() => this.props.registerTeam(this.state.name)}
        />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...registerActions }, dispatch)
}

export default connect(null, mapDispatchToProps)(Register)


