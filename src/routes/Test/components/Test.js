import React from 'react'
import PropTypes from 'prop-types'

export const Test = ({ test, currentTime }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Test: {test}</h2>
    <button className='btn btn-secondary' onClick={currentTime}>
      Current Time
    </button>
  </div>
)
Test.propTypes = {
  test: PropTypes.string.isRequired,
  currentTime: PropTypes.func.isRequired
}

export default Test
