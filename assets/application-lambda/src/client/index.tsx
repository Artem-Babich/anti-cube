import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import getRoutes from '../common/getRoutes'
import Routes from '../common/Routes'
import createStore from '../common/redux/createStore'

const routes = getRoutes()
const store = createStore((window as any).__INITIAL_STATE__)

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes routes={routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-container')
)
