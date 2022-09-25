import { Bell, Search } from 'react-feather'

import defaultAvatar from '../../assets/defaultAvatar.png'
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
            <button>
              <Search size={24} />
            </button>
          </SearchContainer>
        </LeftSide>
        <RightSide>
          <Bell size={20} />
          <Profile>
            <ProfileInfos>
              <strong>{provider.name}</strong>
              <span>{provider.segment.name}</span>
            </ProfileInfos>
            {!provider.avatar_url ? (
              <img src={defaultAvatar} alt="Default Avatar" />
            ) : (
              <img src={provider.avatar_url} alt={provider.name} />
            )}
          </Profile>
        </RightSide>
      </HeaderContent>
    </Container>
  )
}
