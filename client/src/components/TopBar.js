import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RunIcon from 'material-ui/svg-icons/av/play-circle-filled'
import CircularProgress from 'material-ui/CircularProgress'

export default (props) => {
  const runBtn = <FlatButton icon={<RunIcon />} label="Run" onClick={props.onPressRun} />
  const loading = (
    <FlatButton
      icon={<CircularProgress size={32} color="rgb(48, 48, 48)" />}
      label="Compiling..."
      disabled
    />
  )

  return (
    <AppBar
      title={props.title}
      iconElementRight={props.loading ? loading : runBtn}
      onLeftIconButtonClick={props.leftIconClick}
    />
  )
}
