import { Bell, Plus } from 'react-feather'

import { Button } from '../Button'
import { Container, HeaderContent, InteractionButtons } from './styles'

interface HeaderProps {
  title: string
  buttonTitle?: string
  showButton?: boolean
}

export function Header({
  title,
  buttonTitle = 'Criar nova',
  showButton = true
}: HeaderProps): JSX.Element {
  return (
    <Container>
      <HeaderContent>
        <h2>{title}</h2>
        <InteractionButtons>
          <Bell size={18} />
          {showButton && (
            <Button icon={Plus} title={buttonTitle} isButtonTrigger />
          )}
        </InteractionButtons>
      </HeaderContent>
    </Container>
  )
}
