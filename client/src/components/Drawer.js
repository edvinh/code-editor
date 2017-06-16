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

export default (props) => {

  const selectLang = (lang) => { props.setLang(lang) }

  return (
    <Drawer open={props.open} docked={false} width={370} onRequestChange={props.toggle} containerStyle={{ overflowX: 'hidden'}} >
      <Subheader>LANGUAGE</Subheader>
      <Divider />
      <MenuItem primaryText="Java"                    onTouchTap={() => selectLang('java') }       rightIcon={ props.lang === 'java' ? <Check /> : null } />
      <MenuItem primaryText="Python 3 (3.6)"          onTouchTap={() => selectLang('python') }     rightIcon={ props.lang === 'python' ? <Check /> : null } />
      <MenuItem primaryText="JavaScript (Node 7.8.0)" onTouchTap={() => selectLang('node') }       rightIcon={ props.lang === 'node' ? <Check /> : null } />
      <MenuItem primaryText="C/C++"                   onTouchTap={() => selectLang('c') }          rightIcon={ props.lang === 'c' ? <Check /> : null } />
      <MenuItem primaryText="Go"                      onTouchTap={() => selectLang('go') }         rightIcon={ props.lang === 'go' ? <Check /> : null } />
      <MenuItem primaryText="Haskell"                 onTouchTap={() => selectLang('haskell') }    rightIcon={ props.lang === 'haskell' ? <Check /> : null } />
      
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
      <TextField
        hintText="14"
        floatingLabelText="Font Size"
        style={{ marginLeft: 20, width: 330 }}
      />
      <TextField
        hintText="2"
        floatingLabelText="Indentation"
        style={{ marginLeft: 20, width: 330 }}
      />
      <FlatButton
        style={{ marginLeft: 20, marginTop: 20, width: 'calc(100% - 40px)' }}
        primary
        onTouchTap={props.finishedBeer}
        label="I finished my beer!"
      />
      <FlatButton
        style={{ position: 'absolute', bottom: 20, left: 20, width: 'calc(100% - 40px)' }}
        secondary
        onTouchTap={props.clearLocalStorage}
        label="Clear Local Storage"
      />
    </Drawer>
  )
} 