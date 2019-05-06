import { browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './actions'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger()
const middlewares = [
  routerMiddleware(browserHistory),
  sagaMiddleware,
  logger
  // something Middleware...
  // something Middleware...
]

const appliedMiddlewares = applyMiddleware(...middlewares)

const store = createStore(rootReducer, composeWithDevTools(appliedMiddlewares))

sagaMiddleware.run(rootSaga)

export interface CustomSpStore {
  articles: any
}

export const history = syncHistoryWithStore(browserHistory, store, { adjustUrlOnReplay: false })
export default store
