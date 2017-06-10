import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import '../styles/Register.css'

const style = {
  width: '40vw',
  height: '50vh',
  position: 'absolute',
  left: '50%',
  top: '50%',
  margin: '-25vh 0 0 -20vw',
  padding: 20,
}

class Register extends Component {
  constructor () {
    super()
  }

  render() {
    return (
      <div style={style}>
          <h1>CRASH & COMPILE</h1>
          <h2>REGISTER A TEAM</h2>
          <TextField className="teamInput"
            floatingLabelText="Team Name"
            fullWidth
          />
          <br />
          <RaisedButton label="Register" primary className="registerBtn"  />
      </div>
    )
  }
}


export default Register


