import * as moment from 'moment'
import * as React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { compose, pure } from 'recompose'
import LeaderBoardEntity from '../../commons/entity/LeaderBoard'
import * as styles from './ScoreChart.css'
// 型定義ファイルがないので
const randomMC = require('random-material-color')

interface ScoreChartProps {
  activeCompetition: string
  activeMetrics: string
  leaderBoardData: LeaderBoardEntity[]
  searchUser: string
  eachMember: boolean
}

const ScoreChart: React.FunctionComponent<ScoreChartProps> = ({
  leaderBoardData,
  activeCompetition,
  activeMetrics,
  searchUser,
  eachMember
}) => {
  // dateでソート
  const sortedData = leaderBoardData.sort((a, b) => {
    return moment(a.submitted_at) < moment(b.submitted_at)
      ? -1
      : moment(a.submitted_at) > moment(b.submitted_at)
      ? 1
      : 0
  })

  const lineData: object[] = []
  const thisCompetitionUserNames: string[] = []
  let setUsers: string[] = []

  sortedData.forEach(element => {
    if (element.title !== activeCompetition || element.codename !== activeMetrics) {
      return
    }
    if (eachMember && searchUser !== '' && element.team_name !== searchUser) {
      return
    }

    if (eachMember) {
      lineData.push({
        date: moment(element.submitted_at).format('YYYY/MM/DD HH:MM:SS'),
        score: element.main_score
      })
    } else {
      thisCompetitionUserNames.push(element.team_name)
      lineData.push({
        date: moment(element.submitted_at).format('YYYY/MM/DD HH:MM:SS'),
        [element.team_name]: element.main_score
      })
    }
  })
  setUsers = [...new Set(thisCompetitionUserNames)]

  return (
    <div className={styles.lineContainer}>
      <h3>{eachMember ? `${searchUser} Score` : 'AllScore'}</h3>
      <LineChart
        width={800}
        height={300}
        data={lineData}
        margin={{
          bottom: 5,
          left: 20,
          right: 30,
          top: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        {eachMember ? (
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        ) : (
          setUsers.map(names => {
            return (
              <Line
                key={names}
                connectNulls
                type="monotone"
                dataKey={names}
                stroke={randomMC.getColor({ text: names })}
                activeDot={{ r: 8 }}
              />
            )
          })
        )}
      </LineChart>
    </div>
  )
}

export default compose<ScoreChartProps, ScoreChartProps>(pure)(ScoreChart)
