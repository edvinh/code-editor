import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/ext/language_tools'
import 'brace/theme/monokai'
import 'brace/keybinding/vim'

import 'brace/mode/java'
import 'brace/mode/javascript'
import 'brace/mode/python'
import 'brace/mode/haskell'
import 'brace/mode/golang'

export default (props) => {
  return (
    <AceEditor
      style={{ width: '60vw', minHeight: 'calc(100vh - 70px)' }}
      mode={props.lang}
      theme="monokai"
      onChange={props.onChange}
      fontSize={16}
      editorProps={{ $blockScrolling: true }}
      value={props.code}
      enableBasicAutocompletion={props.autocomplete}
      enableLiveAutocompletion={props.liveAutocomplete}
      keyboardHandler={props.vim ? 'vim' : ''}
      tabSize={2}
    />
  )
}
