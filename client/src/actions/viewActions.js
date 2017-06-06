import * as API from './api/'
import * as types from '../constants'

export function compile (code, lang) {
  return async (dispatch) => {
    dispatch({
      type: types.COMPILE,
    })

    const res = await API.compile(code, lang)
    const json = await res.json()
    dispatch({
      type: types.COMPILE_SUCCESS,
      payload: json,
    })
  }
}

export function saveCode (code, lang) {
  return (dispatch) => {
    dispatch({
      type: types.SAVE_CODE_SUCCESS,
      payload: { code, lang }
    })
  }
}

export function changeLang (lang) {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_LANG,
      payload: lang,
    })
  }
}

export function fontSize (size) {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_FONT_SIZE,
      payload: size,
    })
  }
}
