import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import reducer from './reducers'

const middleware = applyMiddleware(promise(), thunk, logger)

const store = createStore(reducer, composeWithDevTools(middleware))

export default store
