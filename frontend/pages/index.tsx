import Posts from '../components/Posts';
import requireAuthentication from '../lib/requireAuth';

export const getServerSideProps = requireAuthentication((ctx: any) => {
  return {
    props: {},
  };
});

export default function Index() {
  return <Posts />;
}
