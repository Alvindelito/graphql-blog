import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export default function Auth() {
  const AUTH_QUERY = gql`
    query AUTH_QUERY {
      auth
    }
  `;

  const { data, loading, error } = useQuery(AUTH_QUERY);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>err</p>;
  }

  if (!data) {
    return <p>no data</p>;
  }
  return <div>{data.auth}</div>;
}
