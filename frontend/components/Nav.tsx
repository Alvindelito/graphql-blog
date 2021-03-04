import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getAccessToken, setAccessToken } from '../lib/accessToken';

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
  const { data, loading } = useQuery(GET_USER_QUERY);
  const [logout, { client }] = useMutation(LOGOUT_MUTATION);

  const token = getAccessToken();

  return (
    <NavStyle>
      <Link href="/">Home</Link>
      <Link href="/">Profile</Link>
      {!token ? (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/register">Register</Link>
        </>
      ) : (
        <button
          onClick={async () => {
            await logout();
            setAccessToken('');
            router.push('/signin');
            await client!.resetStore();
          }}
        >
          <Link href="/signin">logout</Link>
        </button>
      )}
    </NavStyle>
  );
}
