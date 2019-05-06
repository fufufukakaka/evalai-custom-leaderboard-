import classnames from 'classnames'
import * as React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { compose, pure } from 'recompose'
import LeaderBoardEntity from '../../commons/entity/LeaderBoard'

interface MetricsNavProps {
  leaderBoardData: LeaderBoardEntity[]
  competitionName: string
  activeMetrics: string
  toggleMetircs: (element: string) => void
}

const MetricsNav: React.FunctionComponent<MetricsNavProps> = ({
  leaderBoardData,
  competitionName,
  activeMetrics,
  toggleMetircs
}) => {
  const metrics: string[] = []
  leaderBoardData.forEach((element: LeaderBoardEntity) => {
    if (element.title !== competitionName) {
      return
    }
    metrics.push(element.codename)
  })
  const setMetrics = new Set(metrics)
  const navitems: any[] = []
  setMetrics.forEach(element => {
    navitems.push(
      <NavItem>
        <NavLink
          className={classnames({ active: activeMetrics === element })}
          onClick={() => {
            toggleMetircs(element)
          }}
        >
          {element}
        </NavLink>
      </NavItem>
    )
  })
  return <Nav tabs>{navitems}</Nav>
}

export default compose<MetricsNavProps, MetricsNavProps>(pure)(MetricsNav)
