import axios from 'axios'
import { put, call, take, fork } from 'redux-saga/effects'

import { FETCH_LEADERBOARD, FETCH_LEADERBOARD_SUCCESS, FETCH_LEADERBOARD_FAILURE } from '../actions/leaderBoardActions'

//////////////////////////
//// FetchLeaderBoard ////
//////////////////////////

export function* runFetchLeaderBoardHandler() {
  while (true) {
    yield take([`${FETCH_LEADERBOARD}`])
    yield fork(fetchLeaderBoardHandler)
  }
}

function* fetchLeaderBoardHandler() {
  const { data, error } = yield call(fetchLeaderBoard)
  if (error != null) {
    yield put(FETCH_LEADERBOARD_FAILURE(error))
    return
  }
  yield put(FETCH_LEADERBOARD_SUCCESS(data))
}

const fetchLeaderBoard = () => {
  return axios
    .get('api/fetch_leaderboard')
    .then(response => {
      return response
    })
    .catch(error => {
      return { error: error }
    })
}
