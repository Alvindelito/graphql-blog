import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav';

const HeaderStyle = styled.header`
  max-width: var(--maxWidth);
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  /* align-items: stretch; */
  justify-items: end;
`;

const LogoStyle = styled.h1`
  width: 125px;
  height: 60px;
  background-color: var(--red);
  font-size: 5rem;
  display: flex;
  justify-content: center;
  text-transform: uppercase;

  a {
    color: var(--white);
    font-size: 4rem;
    font-weight: bold;
    display: flex;
    align-self: center;
  }
`;

export default function Header() {
  return (
    <HeaderStyle>
      <LogoStyle>
        <Link href="/">Blog</Link>
      </LogoStyle>
      <Nav />
    </HeaderStyle>
  );
}
