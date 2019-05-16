import { createAction, handleActions } from 'redux-actions'

/////////////////
//// Actions ////
/////////////////

const BASE_ACTION_NAME = 'leaderBoard'

export const INIT_STATE = createAction(`${BASE_ACTION_NAME}/init_state`)

export const FETCH_LEADERBOARD = createAction(`${BASE_ACTION_NAME}/fetch_leaderboard`)
export const FETCH_LEADERBOARD_SUCCESS = createAction(`${BASE_ACTION_NAME}/fetch_leaderboard/success`)
export const FETCH_LEADERBOARD_FAILURE = createAction(`${BASE_ACTION_NAME}/fetch_leaderboard/failure`)

export const FETCH_COMPETITIONS = createAction(`${BASE_ACTION_NAME}/fetch_competitions`)
export const FETCH_COMPETITIONS_SUCCESS = createAction(`${BASE_ACTION_NAME}/fetch_competitions/success`)
export const FETCH_COMPETITIONS_FAILURE = createAction(`${BASE_ACTION_NAME}/fetch_competitions/failure`)

export const ACTIVE_COMPETITION = createAction(`${BASE_ACTION_NAME}/active_competition`)
export const ACTIVE_METRICS = createAction(`${BASE_ACTION_NAME}/active_metrics`)
export const SET_SEARCH_USER = createAction(`${BASE_ACTION_NAME}/set_search_user`)
export const SORT_SCORE_ASCENDING = createAction(`${BASE_ACTION_NAME}/sort_score_ascending`)

/////////////////
//// Reducer ////
/////////////////
const initialState = {
  searchUser: '',
  activeCompetition: '',
  activeMetrics: '',
  scoreSortAscending: false,
  leaderBoardData: null,
  competitions: null
}

export default handleActions(
  {
    [INIT_STATE]: state => ({
      ...state,
      searchUser: '',
      activeCompetition: '',
      activeMetrics: '',
      scoreSortAscending: false,
      leaderBoardData: null,
      competitions: null
    }),
    [FETCH_LEADERBOARD_SUCCESS]: (state, action) => ({
      ...state,
      leaderBoardData: action.payload
      // TODO: leaderboard情報とは別に、competition情報を取得するactionを新たに作るべき
    }),
    [FETCH_COMPETITIONS_SUCCESS]: (state, action) => ({
      ...state,
      competitions: [...new Set(action.payload.map(element => element.title))],
      activeCompetition: [...new Set(action.payload.map(element => element.title))][0],
      activeMetrics: [...new Set(action.payload.map(element => element.codename))][0]
    }),
    [ACTIVE_COMPETITION]: (state, action) => ({
      ...state,
      activeCompetition: action.payload
    }),
    [ACTIVE_METRICS]: (state, action) => ({
      ...state,
      activeMetrics: action.payload
    }),
    [SET_SEARCH_USER]: (state, action) => ({
      ...state,
      searchUser: action.payload
    }),
    [SORT_SCORE_ASCENDING]: state => ({
      ...state,
      scoreSortAscending: !state.scoreSortAscending
    })
  },
  initialState
)
