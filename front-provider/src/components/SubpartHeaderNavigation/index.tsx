import { Dispatch, SetStateAction } from 'react'
import { ChevronLeft } from 'react-feather'
import { Link } from 'react-router-dom'

import { Container, NavigationButton } from './styles'

export type CurrentTabOptions = 'details' | 'reviews'

interface SubpartHeaderNavigationProps {
  currentTab: CurrentTabOptions
  setCurrentTab: Dispatch<SetStateAction<CurrentTabOptions>>
}

export function SubpartHeaderNavigation({
  currentTab,
  setCurrentTab
}: SubpartHeaderNavigationProps): JSX.Element {
  return (
    <Container>
      <Link to="/parts">
        <ChevronLeft size={22} />
      </Link>
      <nav>
        <NavigationButton
          selected={currentTab === 'details'}
          onClick={() => setCurrentTab('details')}
        >
          Detalhes
        </NavigationButton>
        <NavigationButton
          selected={currentTab === 'reviews'}
          onClick={() => setCurrentTab('reviews')}
        >
          Análises
        </NavigationButton>
      </nav>
    </Container>
  )
}
