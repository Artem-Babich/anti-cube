import React from 'react'
import './AppHeader.css'

function AppHeader() {
  return (
    <div className={'App-header'}>
      <div className={'logoContainer'}>
        <div>
          <span className={'logo'}>СберФото</span>
        </div>
      </div>
      <div className={'accountButtons'}>
        <div>
          <span>Вход</span>
        </div>
        <div>
          <span>Регистрация</span>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
