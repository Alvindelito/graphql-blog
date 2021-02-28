import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from './hooks/useForm';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
    }
  }
`;

export default function Register() {
  const { inputs, handleChange }: any = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [register, { data, loading, error }]: any = useMutation(
    CREATE_USER_MUTATION,
    {
      variables: {
        email: inputs.email,
        password: inputs.password,
        name: inputs.name,
      },
    },
  );

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    try {
      const res = await register();
      console.log('res', res);
    } catch (err) {
      console.error('error', error);
    }
  }
  return (
    <form method="/" onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <label htmlFor="name">
        Name:
        <input
          type="name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
