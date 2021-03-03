import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from './hooks/useForm';
import { setAccessToken } from '../lib/accessToken';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange }: any = useForm({
    email: '',
    password: '',
  });

  const [signin, { error }]: any = useMutation(LOGIN_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
    },
  });

  // TODO: fix event type
  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await signin();
    if (res && res.data) {
      setAccessToken(res.data.loginUser.accessToken);
    }
  }

  return (
    <form method="/" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          placeholder="email"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          placeholder="password"
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}
