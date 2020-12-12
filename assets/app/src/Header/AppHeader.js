import React from 'react'
import './AppHeader.css'

function AppHeader() {
  return (
    <div className={'App-header'}>
      <div className={'logoContainer'}>
        <div>
          <span className={'logo'}>Sbergram</span>
        </div>
      </div>
      <div className={'accountButtons'}>
        <div>
          <span>Sign In</span>
        </div>
        <div>
          <span>Sign Up</span>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
