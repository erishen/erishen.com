import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'video/:liveID/:playbackType',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Video = require('./containers/VideoContainer').default
      const reducer = require('./modules/video').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'video', reducer })

      /*  Return getComponent   */
      cb(null, Video)

      /* Webpack named bundle   */
    }, 'video')
  }
})
