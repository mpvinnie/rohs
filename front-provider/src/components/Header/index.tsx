import { Bell, Search } from 'react-feather'

import { useAuth } from '../../hooks/AuthContext'
import {
  Container,
  HeaderContent,
  LeftSide,
  SearchContainer,
  RightSide,
  Profile,
  ProfileInfos
} from './styles'

export function Header(): JSX.Element {
  const { provider } = useAuth()

  return (
    <Container>
      <HeaderContent>
        <LeftSide>
          <SearchContainer>
            <input type="text" placeholder="Buscar nessa página" />
            <Search size={24} />
          </SearchContainer>
        </LeftSide>
        <RightSide>
          <Bell size={20} />
          <Profile>
            <ProfileInfos>
              <strong>{provider.name}</strong>
              <span>{provider.segment.name}</span>
            </ProfileInfos>
            <img src={provider.avatar_url} alt={provider.name} />
          </Profile>
        </RightSide>
      </HeaderContent>
    </Container>
  )
}
