import * as Moment from 'moment'
import * as React from 'react'
import Select from 'react-select'
import * as ReactTooltip from 'react-tooltip'
import { Table } from 'reactstrap'
import { compose, pure } from 'recompose'
import LeaderBoardEntity from '../../commons/entity/LeaderBoard'
import MetricsNav from '../../components/MetricsNav/MetricsNav'

interface BoardTableProps {
  activeCompetition: string
  toggleMetrics: (element: string) => void
  setSearchUser: (element: string) => void
  changeSortAscending: () => void
  leaderBoardData: LeaderBoardEntity[]
  scoreSortAscending: boolean
  activeMetrics: string
  searchUser: string
}

const BoardTable: React.FunctionComponent<BoardTableProps> = ({
  activeCompetition,
  toggleMetrics,
  setSearchUser,
  changeSortAscending,
  leaderBoardData,
  scoreSortAscending,
  activeMetrics,
  searchUser
}) => {
  // main_scoreでソート
  const sortedData: any[] = leaderBoardData.sort((a, b) => {
    return a.main_score < b.main_score
      ? scoreSortAscending
        ? -1
        : 1
      : a.main_score > b.main_score
      ? scoreSortAscending
        ? 1
        : -1
      : 0
  })

  const tableData: any[] = []
  sortedData.forEach((element, index) => {
    if (element.title !== activeCompetition || element.codename !== activeMetrics) {
      return
    }
    if (searchUser !== '' && element.team_name !== searchUser) {
      return
    }
    tableData.push(
      <tr>
        <th scope="row">{index}</th>
        <td>{element.team_name}</td>
        <td>
          {element.main_score.toFixed(6)}
          <a data-tip={JSON.stringify(element.extract_output)}>
            <i className="fas fa-info-circle fa-fw" />
            <ReactTooltip effect="solid" place="bottom" />
          </a>
        </td>
        <td>
          {element.method_name}
          {element.method_description ? (
            <a data-tip={element.method_description} data-multiline>
              <i className="fas fa-comment-dots fa-fw" />
              <ReactTooltip effect="solid" place="bottom" />
            </a>
          ) : null}
        </td>
        <td>
          {element.project_url === '' ? (
            'None'
          ) : (
            <a href={element.project_url}>
              <i className="fas fa-book fa-fw" />
            </a>
          )}
        </td>
        <td>{element.submission_number}</td>
        <td>{Moment(element.submitted_at).format('YYYY/MM/DD HH:MM:SS')}</td>
      </tr>
    )
  })
  const metrics: string[] = []
  leaderBoardData.forEach(element => {
    if (element.title !== activeCompetition || element.codename !== activeMetrics) {
      return
    }
    metrics.push(element.default_metrics)
  })
  const userNames: string[] = []
  leaderBoardData.forEach(element => {
    if (element.title !== activeCompetition || element.codename !== activeMetrics) {
      return
    }
    userNames.push(element.team_name)
  })
  const searchUserNames: any[] = []
  const setUsers = [...new Set(userNames)]
  setUsers.forEach(element => {
    searchUserNames.push({
      label: element,
      value: element
    })
  })
  return (
    <React.Fragment>
      <MetricsNav
        leaderBoardData={leaderBoardData}
        competitionName={activeCompetition}
        activeMetrics={activeMetrics}
        toggleMetircs={e => toggleMetrics(e)}
      />
      <p>Main Metrics: {metrics[0]}</p>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>
              User Name
              <Select
                options={searchUserNames}
                isSearchable={true}
                isClearable={true}
                onChange={value => setSearchUser(value)}
              />
            </th>
            <th onClick={() => changeSortAscending()}>
              Main Score(Detail Popover)
              {scoreSortAscending ? (
                <i className="fa fa-angle-down fa-fw" aria-hidden="true" />
              ) : (
                <i className="fa fa-angle-up fa-fw" aria-hidden="true" />
              )}
            </th>
            <th>Method(Detail Popover)</th>
            <th>Script URL</th>
            <th>Submit Number</th>
            <th>Submit Date</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </Table>
    </React.Fragment>
  )
}

export default compose<BoardTableProps, BoardTableProps>(pure)(BoardTable)
