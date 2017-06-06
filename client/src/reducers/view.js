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
  liveAutocomplete: true,
  autocomplete: false,
  vim: false,
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
    case types.UPDATE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload,
      }
    case types.TOGGLE_AUTOCOMPLETE:
      return {
        ...state,
        autocomplete: action.payload,
      }
    case types.TOGGLE_LIVE_AUTOCOMPLETE:
      return {
        ...state,
        liveAutocomplete: action.payload,
      }
    default:
      return state
  }
}
