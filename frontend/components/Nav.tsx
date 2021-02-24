import Link from 'next/link';
import styled from 'styled-components';

const NavStyle = styled.nav`
  color: white;
  margin: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;

  a {
    width: 75px;
    height: 50px;
    margin: 4px;
    color: var(--darkBlue);
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function Nav() {
  return (
    <NavStyle>
      <Link href="/">Home</Link>
      <Link href="/">Profile</Link>
    </NavStyle>
  );
}
