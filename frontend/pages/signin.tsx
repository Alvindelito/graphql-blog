import SignIn from '../components/SignIn';

// import requireAuthentication from '../lib/requireAuth';

// export const getServerSideProps = requireAuthentication((ctx) => {
//   return {
//     props: {},
//   };
// });

export default function LoginPage() {
  return <SignIn />;
}
