var moment = require('moment')
var rest = require('../../../utils/rest');

// ------------------------------------
// Constants
// ------------------------------------
export const VIDEO_CURRENT_TIME = 'VIDEO_CURRENT_TIME'
export const VIDEO_GET_WATCH_LIVE = 'VIDEO_GET_WATCH_LIVE'

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
          type    : VIDEO_CURRENT_TIME,
          payload : moment().format()
        })
        resolve()
      }, 200)
    })
  }
}

export const getWatchLive = (liveID, playbackType) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      liveID = parseInt(liveID, 10);

      rest.fetch('watchLive', { liveID: liveID }, (result)=>{
        console.log('result', result);
        if(result)
        {
          dispatch({
            type    : VIDEO_GET_WATCH_LIVE,
            payload : {
              src: '',
              poster: ''
            }
          });
        }
        else
        {
          dispatch({
            type    : VIDEO_GET_WATCH_LIVE,
            payload : null
          });
        }
        resolve();
      }, ()=>{
          dispatch({
              type    : VIDEO_GET_WATCH_LIVE,
              payload : null
          });
      });
    })
  }
}

export const actions = {
  currentTime,
  getWatchLive
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [VIDEO_CURRENT_TIME]: (state, action) => action.payload,
  [VIDEO_GET_WATCH_LIVE] : (state, action) => {
    var newState = {...state};
    var payload = action.payload;
    if(payload)
    {
      newState.src = payload.src;
      newState.poster = payload.poster;
    }
    return newState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  id: 'my_video_1',
  src: 'http://172.25.143.1:9999/oceans.mp4',
  poster: 'http://172.25.143.1:9999/oceans.png'
}

export default function videoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
