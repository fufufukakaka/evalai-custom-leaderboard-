import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import LeaderBoard from './containers/LeaderBoard/LeaderBoard'

render(
  <Provider store={store}>
    <LeaderBoard />
  </Provider>,
  document.getElementById('app')
)
