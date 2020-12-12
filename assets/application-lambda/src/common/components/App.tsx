import * as React from 'react'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'

import * as actions from '../redux/actions'

const App = (props: { children: any }) => {
  const { children } = props

  const username = useSelector((state:{ profile: { username: string } }) => state.profile?.username)
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const login = useCallback(
    () => dispatch(actions.login()),
    [dispatch]
  );
  const logout = useCallback(
    () => dispatch(actions.logout()),
    [dispatch]
  );

  return <div className="application">
    <div className="header">
      <div className="header__content">
        <a className="header__logo" href="/" >
          СберФото
        </a>
        <div className="header__menu">
          <div className="header__menu_items">
            {pathname !== '/login' ? (username ? (
              <a className="header__logout"  href="/" onClick={logout}/>
            ) : (
              <a className="header__login" href="/login" onClick={login}/>
            )) : null}
          </div>
        </div>
      </div>
    </div>
    {children}
  </div>
}

export default App
