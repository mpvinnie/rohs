import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
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
  background: var(--zinc-800);
  padding: 0.875rem 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    background: inherit;
    width: 100%;
    margin-right: 1rem;
    border: 0;
    font-size: 1rem;
    color: var(--white);

    &::placeholder {
      color: var(--zinc-500);
    }
  }

  button {
    background: inherit;

    svg {
      color: var(--zinc-500);
    }
  }
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: var(--zinc-500);
    margin: 0 2.5rem;
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 2rem;
    height: 2rem;
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
    color: var(--white);
    line-height: 1.5rem;
  }

  span {
    font-size: 0.875rem;
    color: var(--zinc-500);
  }
`
