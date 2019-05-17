import React, { PureComponent } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as styles from './LeaderBoard.css'
import {
  FETCH_LEADERBOARD,
  FETCH_COMPETITIONS,
  ACTIVE_COMPETITION,
  ACTIVE_METRICS,
  SET_SEARCH_USER,
  SORT_SCORE_ASCENDING
} from '../../actions/leaderBoardActions'
import CompetitionNav from '../../components/CompetitionNav/CompetitionNav'
import BoardTab from '../../components/BoardTab/BoardTab'
import ScoreChart from '../../components/ScoreChart/ScoreChart'

class LeaderBoard extends PureComponent {
  toggleCompetition(competition) {
    if (this.props.activeCompetition !== competition) {
      this.props.changeActiveCompetition(competition)
    }
  }
  toggleMetrics(metrics) {
    if (this.props.activeMetrics !== metrics) {
      this.props.changeActiveMetrics(metrics)
    }
  }
  changeSortAscending() {
    this.props.changeSortScoreAscending()
  }
  setSearchUser(selectedOption) {
    this.props.setSearchUser(selectedOption ? selectedOption.value : '')
  }
  async asyncFetchData() {
    await this.props.fetchCompetitions()
    await this.props.fetchLeaderBoard()
    return 'done'
  }
  componentDidMount() {
    this.asyncFetchData()
  }
  render() {
    const {
      searchUser,
      activeCompetition,
      activeMetrics,
      leaderBoardData,
      competitions,
      scoreSortAscending,
      competitionInfo
    } = this.props
    return (
      <div>
        <Container className={styles.container}>
          <div className={styles.headerContainer}>
            <h2>EvalAI-Custom-LeaderBoard</h2>
            <p>
              <i className={`fas fa-bolt fa-fw ${styles.isOnGoing}`} /> ... OnGoing Competition,{' '}
              <i className={`fas fa-history fa-fw ${styles.isPast}`} /> ... Past Competition
            </p>
          </div>
          {competitions ? (
            <CompetitionNav
              competitionInfo={competitionInfo}
              competitionList={competitions}
              activeCompetition={activeCompetition}
              toggleCompetition={e => this.toggleCompetition(e)}
            />
          ) : null}
          {leaderBoardData ? (
            searchUser === '' ? (
              competitions ? (
                <ScoreChart
                  activeCompetition={activeCompetition}
                  activeMetrics={activeMetrics}
                  leaderBoardData={leaderBoardData}
                  searchUser={searchUser}
                  eachMember={false}
                />
              ) : null
            ) : (
              <ScoreChart
                activeCompetition={activeCompetition}
                activeMetrics={activeMetrics}
                leaderBoardData={leaderBoardData}
                searchUser={searchUser}
                eachMember={true}
              />
            )
          ) : null}
          <div className={styles.leaderBoardContainer}>
            {competitions ? (
              <BoardTab
                competitionList={competitions}
                activeCompetition={activeCompetition}
                toggleMetrics={e => this.toggleMetrics(e)}
                setSearchUser={e => this.setSearchUser(e)}
                changeSortAscending={() => this.changeSortAscending()}
                leaderBoardData={leaderBoardData}
                scoreSortAscending={scoreSortAscending}
                activeMetrics={activeMetrics}
                searchUser={searchUser}
              />
            ) : null}
          </div>
        </Container>
      </div>
    )
  }
}

LeaderBoard.propTypes = {
  fetchLeaderBoard: PropTypes.func.isRequired,
  fetchCompetitions: PropTypes.func.isRequired,
  changeActiveCompetition: PropTypes.func.isRequired,
  changeActiveMetrics: PropTypes.func.isRequired,
  setSearchUser: PropTypes.func.isRequired,
  changeSortScoreAscending: PropTypes.func.isRequired,
  searchUser: PropTypes.string,
  scoreSortAscending: PropTypes.boolean,
  activeCompetition: PropTypes.string,
  activeMetrics: PropTypes.string,
  leaderBoardData: PropTypes.array,
  competitions: PropTypes.array,
  competitionInfo: PropTypes.array
}

const mapStateToProps = state => {
  return {
    searchUser: state.leaderBoard.searchUser,
    leaderBoardData: state.leaderBoard.leaderBoardData,
    competitionInfo: state.leaderBoard.competitionInfo,
    competitions: state.leaderBoard.competitions,
    scoreSortAscending: state.leaderBoard.scoreSortAscending,
    activeCompetition: state.leaderBoard.activeCompetition,
    activeMetrics: state.leaderBoard.activeMetrics
  }
}
const mapDispatchToProps = dispatch => ({
  fetchLeaderBoard: () => dispatch(FETCH_LEADERBOARD()),
  fetchCompetitions: () => dispatch(FETCH_COMPETITIONS()),
  changeActiveCompetition: competition => dispatch(ACTIVE_COMPETITION(competition)),
  changeActiveMetrics: metrics => dispatch(ACTIVE_METRICS(metrics)),
  setSearchUser: searchUser => dispatch(SET_SEARCH_USER(searchUser)),
  changeSortScoreAscending: () => dispatch(SORT_SCORE_ASCENDING())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoard)
