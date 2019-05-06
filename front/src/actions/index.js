import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import leaderBoard from './leaderBoardActions'

const rootReducer = combineReducers({
  routing,
  leaderBoard
})

export default rootReducer
