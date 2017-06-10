import { REHYDRATE } from 'redux-persist/constants'
import * as types from '../constants'

const initialState = {
  name: null,
  accessToken: null,
}

export default function teamReducer (state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_TEAM_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        accessToken: action.payload._id,
      }
    default:
      return state
  }
}
