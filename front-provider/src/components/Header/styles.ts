import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;
  max-height: 6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3.5rem;
  background: var(--white);
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 70rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LeftSide = styled.div``

export const SearchContainer = styled.div`
  width: 20rem;
  border-radius: 2rem;
  background: var(--green_10);
  padding: 1rem 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    background: inherit;
    width: 100%;
    margin-right: 1rem;
    border: 0;
    font-size: 1rem;
    color: var(--blue_900);

    &::placeholder {
      color: var(--purple_300);
    }
  }

  svg {
    color: var(--purple_300);
  }
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: var(--purple_300);
    margin: 0 2rem;
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 1rem;
  }
`

export const ProfileInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    font-size: 1rem;
    color: var(--blue_900);
    line-height: 1rem;
  }

  span {
    font-size: 0.875rem;
    color: var(--purple_300);
  }
`
