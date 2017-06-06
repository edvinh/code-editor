import * as types from '../constants'
import * as utils from '../utils'

const initialState = { 
  code: {
    java: utils.defaultCode('java'),
    python: utils.defaultCode('python'),
    haskell: utils.defaultCode('haskell'),
    javascript: utils.defaultCode('javascript'),
  },
  output: false,
  compiling: false,
  fontSize: 16,
  lang: 'java',
}
export default function codeReducer (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_LANG:
      return {
        ...state,
        lang: action.payload,
      }
    case types.SAVE_CODE_SUCCESS:
      return {
        ...state,
        code: {
          ...state.code,
          [action.payload.lang]: action.payload.code,
        },
      }
    case types.COMPILE: {
      return {
        ...state,
        compiling: true,
      }
    }
    case types.COMPILE_SUCCESS:
      return {
        ...state,
        compiling: false,
        output: action.payload,
      }
    default:
      return state
  }
}
