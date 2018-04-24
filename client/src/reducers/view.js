import { REHYDRATE } from 'redux-persist/constants'
import * as types from '../constants'
import * as utils from '../utils'

const initialState = {
  code: {
    java: utils.defaultCode('java'),
    python: utils.defaultCode('python'),
    haskell: utils.defaultCode('haskell'),
    node: utils.defaultCode('node'),
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
    // Set `compiling` to false when loading a persisted state
    // since we don't care about it
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.view,
        compiling: false,
      }
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
    case types.COMPILE_FAIL:
      return {
        ...state,
        compiling: false,
        output: { stdout: action.payload },
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
    case types.TOGGLE_VIM:
      return {
        ...state,
        vim: action.payload,
      }
    default:
      return state
  }
}
