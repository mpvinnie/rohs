import { Dispatch, SetStateAction } from 'react'
import { ChevronLeft, Plus } from 'react-feather'
import { Link } from 'react-router-dom'

import { Container, ButtonTrigger, NavigationButton } from './styles'

export type CurrentTabOptions = 'details' | 'reviews'

interface SubpartHeaderNavigationProps {
  currentTab: CurrentTabOptions
  setCurrentTab: Dispatch<SetStateAction<CurrentTabOptions>>
  showAddSupartButton: boolean
}

export function SubpartHeaderNavigation({
  currentTab,
  setCurrentTab,
  showAddSupartButton
}: SubpartHeaderNavigationProps): JSX.Element {
  return (
    <Container>
      <div>
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
      </div>
      {showAddSupartButton && (
        <ButtonTrigger>
          <Plus size={18} />
          Adicionar subparte
        </ButtonTrigger>
      )}
    </Container>
  )
}
