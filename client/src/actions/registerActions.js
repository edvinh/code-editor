import * as API from './api/'
import * as types from '../constants'

// eslint-disable-next-line
export function registerTeam(name) {
  return async (dispatch) => {
    dispatch({
      type: types.REGISTER_TEAM,
    })

    try {
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
    } catch (err) {
      console.log(err)
      dispatch({
        type: types.REGISTER_TEAM_FAIL,
        payload: 'Server error :(',
      })
    }
  }
}
