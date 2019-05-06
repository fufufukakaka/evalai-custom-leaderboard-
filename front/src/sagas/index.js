import { fork } from 'redux-saga/effects'
import * as LeaderBoard from './leaderboardSaga'

export default function* rootSaga() {
  yield fork(LeaderBoard.runFetchLeaderBoardHandler)
}
