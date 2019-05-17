import * as React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { compose, pure } from 'recompose'
import CompetitionInfoEntity from '../../commons/entity/competitionInfo'
import * as styles from './CompetitionNav.css'

interface CompetitionNavProps {
  competitionInfo: CompetitionInfoEntity[]
  competitionList: string[]
  activeCompetition: string
  toggleCompetition: (element: string) => void
}

const CompetitionNav: React.FunctionComponent<CompetitionNavProps> = ({
  competitionInfo,
  competitionList,
  activeCompetition,
  toggleCompetition
}) => {
  const navitems: any[] = []
  competitionList.forEach((element, index) => {
    const isPast = competitionInfo.filter(c => {
      return c.title === element
    })[0].is_past
    navitems.push(
      <NavItem key={`competitionNav${index}`}>
        <NavLink
          className={activeCompetition === element ? 'active' : ''}
          onClick={() => {
            toggleCompetition(element)
          }}
        >
          {isPast ? (
            <i className={`fas fa-history fa-fw ${styles.isPast}`} />
          ) : (
            <i className={`fas fa-bolt fa-fw ${styles.isOnGoing}`} />
          )}
          {element}
        </NavLink>
      </NavItem>
    )
  })
  return <Nav tabs>{navitems}</Nav>
}

export default compose<CompetitionNavProps, CompetitionNavProps>(pure)(CompetitionNav)
