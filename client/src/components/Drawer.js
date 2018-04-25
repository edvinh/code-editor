import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Check from 'material-ui/svg-icons/navigation/check'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

const checkBoxStyle = {
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 40,
}

const langs = [
  { lang: 'java', displayName: 'Java' },
  { lang: 'python', displayName: 'Python 3.6' },
  { lang: 'node', displayName: 'JavaScript (Node 9)' },
  { lang: 'c', displayName: 'C/C++ (GCC 4.9)' },
  { lang: 'go', displayName: 'Go' },
  { lang: 'haskell', displayName: 'Haskell' },
]

const renderMenuItems = (list, selectLang, currentLang) =>
  list.map(item => (
    <MenuItem
      primaryText={item.displayName}
      onClick={() => selectLang(item.lang)}
      rightIcon={currentLang === item.lang ? <Check /> : null}
      key={item.lang}
    />
  ))

export default props => (
  <Drawer
    open={props.open}
    docked={false}
    width={370}
    onRequestChange={props.toggle}
    containerStyle={{ overflowX: 'hidden' }}
  >
    <Subheader>LANGUAGE</Subheader>
    <Divider />
    {renderMenuItems(langs, props.setLang, props.lang)}

    <Subheader>EDITOR SETTINGS</Subheader>
    <Divider />
    <Checkbox
      label="Autocomplete"
      labelPosition="left"
      iconStyle={{ marginLeft: 0 }}
      style={checkBoxStyle}
      checked={props.autocomplete}
      onCheck={(evt, isChecked) => props.onCheck('autocomplete', isChecked)}
    />
    <Checkbox
      label="Live autocomplete"
      labelPosition="left"
      style={checkBoxStyle}
      iconStyle={{ marginLeft: 0 }}
      checked={props.liveAutocomplete}
      onCheck={(evt, isChecked) => props.onCheck('liveAutocomplete', isChecked)}
    />
    <Checkbox
      label="VIM Bindings"
      labelPosition="left"
      iconStyle={{ marginLeft: 0 }}
      style={checkBoxStyle}
      checked={props.vim}
      onCheck={(evt, isChecked) => props.onCheck('vim', isChecked)}
    />
    <Checkbox
      label="Notifications"
      labelPosition="left"
      iconStyle={{ marginLeft: 0 }}
      style={checkBoxStyle}
      checked={props.notifications}
      onCheck={(evt, isChecked) => props.onCheck('notifications', isChecked)}
    />
    <TextField
      hintText="14"
      floatingLabelText="Font Size"
      style={{ marginLeft: 20, width: 330 }}
      value={props.fontSize}
      onChange={(evt, val) => props.onFontChange(val)}
    />
    <FlatButton
      style={{ marginLeft: 20, marginTop: 20, width: 'calc(100% - 40px)' }}
      primary
      onClick={props.finishedBeer}
      label="I finished my beer!"
    />
    <FlatButton
      style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 'calc(100% - 40px)',
      }}
      secondary
      onClick={props.clearLocalStorage}
      label="Clear Local Storage"
    />
  </Drawer>
)
