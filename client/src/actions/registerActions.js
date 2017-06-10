import * as API from './api/'
import * as types from '../constants'


// Function with side-effects unfortunately, 
// since we're modifying localStorage
export function registerTeam (name) {
  return async (dispatch) => {
    dispatch({
      type: types.REGISTER_TEAM,
    })

    const res = await API.register(name)
    const json = await res.json()

    if (json.success) {
      return dispatch({
        type: types.REGISTER_TEAM_SUCCESS,
        payload: json.team,
      })
    }

    dispatch({
      type: types.REGISTER_TEAM_FAIL,
      payload: json.message,
    })
  }
}
