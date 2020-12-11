import { createStore, applyMiddleware, compose } from 'redux'

import reducer from './reducer'
import middlewares from './middlewares'

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
)

const ensureStore = (initialState?: any) => createStore(reducer, initialState, enhancer)

export default ensureStore
