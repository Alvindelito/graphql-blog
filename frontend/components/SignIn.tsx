import useForm from './hooks/useForm';

export default function SignIn() {
  const { inputs, handleChange }: any = useForm({
    email: '',
    password: '',
  });

  // TODO: fix event type
  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <form method="/" onSubmit={handleSubmit}>
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
