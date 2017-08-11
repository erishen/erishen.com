var moment = require('moment')

// ------------------------------------
// Constants
// ------------------------------------
export const TEST_CURRENT_TIME = 'TEST_CURRENT_TIME'

// ------------------------------------
// Actions
// ------------------------------------
/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const currentTime = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : TEST_CURRENT_TIME,
          payload : moment().format()
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  currentTime
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TEST_CURRENT_TIME] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ''
export default function testReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
