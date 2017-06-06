import React from 'react'
import AceEditor from 'react-ace'

import 'brace/theme/monokai'
import 'brace/mode/java'

export default (props) => {
  return (
    <AceEditor
      style={{ width: '60vw', minHeight: 'calc(100vh - 68px)' }}
      mode={props.lang}
      theme="monokai"
      onChange={props.onChange}
      fontSize={16}
      editorProps={{ $blockScrolling: true }}
      value={props.code}
    />
  )
}
