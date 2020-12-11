import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import getRoutes from '../common/getRoutes'
import Routes from '../common/Routes'

const routes = getRoutes()
const store = createStore(() => null)

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes routes={routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-container')
)
