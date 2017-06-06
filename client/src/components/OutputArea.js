import React from 'react'

const titleStyle = {
  fontWeight: 100, 
  letterSpacing: 2, 
  fontSize: 16, 
}

export default (props) => {
  let value = ''
  let textColor = 'white'
  if (props.output.stdout) {
    value += props.output.stdout + '\n'
  }

  if (props.output.stderr) {
    textColor = 'red'
    value += props.output.stderr
  }
  return (
    <div>
      <h3 style={titleStyle}>&nbsp;OUTPUT</h3>
      <textarea value={value} style={{ color: textColor }} readOnly />
    </div>
  )
}