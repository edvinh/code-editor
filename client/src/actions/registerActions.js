import * as API from './api/'
import * as types from '../constants'

export function registerTeam (name) {
  return (dispatch) => {
    dispatch({
      type: types.REGISTER_TEAM,
    })

    /* todo */ 
  }
}
