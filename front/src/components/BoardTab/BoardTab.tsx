import * as React from 'react'
import { TabContent, TabPane } from 'reactstrap'
import { compose, pure } from 'recompose'
import LeaderBoardEntity from '../../commons/entity/LeaderBoard'
import BoardTable from '../BoardTable/BoardTable'
import * as styles from './BoardTab.css'

interface BoardTabProps {
  competitionList: string[]
  activeCompetition: string
  toggleMetrics: (element: string) => void
  setSearchUser: (element: string) => void
  changeSortAscending: () => void
  leaderBoardData: LeaderBoardEntity[]
  scoreSortAscending: boolean
  activeMetrics: string
  searchUser: string
}

const BoardTab: React.FunctionComponent<BoardTabProps> = ({
  competitionList,
  activeCompetition,
  toggleMetrics,
  setSearchUser,
  changeSortAscending,
  leaderBoardData,
  scoreSortAscending,
  activeMetrics,
  searchUser
}) => {
  const tabitems: any[] = []
  competitionList.forEach(element => {
    tabitems.push(
      <TabPane className={styles.tabContainer} tabId={element}>
        {leaderBoardData ? (
          <BoardTable
            activeCompetition={activeCompetition}
            toggleMetrics={e => toggleMetrics(e)}
            setSearchUser={e => setSearchUser(e)}
            changeSortAscending={() => changeSortAscending()}
            leaderBoardData={leaderBoardData}
            scoreSortAscending={scoreSortAscending}
            activeMetrics={activeMetrics}
            searchUser={searchUser}
          />
        ) : null}
      </TabPane>
    )
  })
  return <TabContent activeTab={activeCompetition}>{tabitems}</TabContent>
}

export default compose<BoardTabProps, BoardTabProps>(pure)(BoardTab)
