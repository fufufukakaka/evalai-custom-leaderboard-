import classnames from 'classnames'
import * as React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { compose, pure } from 'recompose'

interface CompetitionNavProps {
  competitionList: string[]
  activeCompetition: string
  toggleCompetition: (element: string) => void
}

const CompetitionNav: React.FunctionComponent<CompetitionNavProps> = ({
  competitionList,
  activeCompetition,
  toggleCompetition
}) => {
  const navitems: any[] = []
  competitionList.forEach((element, index) => {
    navitems.push(
      <NavItem key={`competitionNav${index}`}>
        <NavLink
          className={classnames({ active: activeCompetition === element })}
          onClick={() => {
            toggleCompetition(element)
          }}
        >
          {element}
        </NavLink>
      </NavItem>
    )
  })
  return <Nav tabs>{navitems}</Nav>
}

export default compose<CompetitionNavProps, CompetitionNavProps>(pure)(CompetitionNav)
