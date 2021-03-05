import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getAccessToken, setAccessToken } from '../lib/accessToken';

const NavStyle = styled.nav`
  color: white;
  margin: 10px;
  display: flex;
  align-items: center;

  a {
    /* width: 75px; */
    height: 50px;
    margin: 4px;
    color: var(--darkBlue);
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    outline: none;
    background: transparent;
    border: none;
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

  button:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const GET_USER_QUERY = gql`
  query GET_USER_QUERY {
    getUser {
      id
      email
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logoutUser
  }
`;

export default function Nav() {
  const router = useRouter();
  const [logout, { client }] = useMutation(LOGOUT_MUTATION);

  const token = getAccessToken();

  if (!token) {
    return (
      <NavStyle>
        <Link href="/signin">Sign In</Link>
        <Link href="/register">Register</Link>
      </NavStyle>
    );
  }

  return (
    <NavStyle>
      <Link href="/">Home</Link>
      <Link href="/">Profile</Link>
      <Link href="/newpost">New Post</Link>
      <Link href="/signin">
        <button
          onClick={async () => {
            await logout();
            setAccessToken('');
            router.push('/signin');
            await client!.resetStore();
          }}
        >
          Logout
        </button>
      </Link>
    </NavStyle>
  );
}
