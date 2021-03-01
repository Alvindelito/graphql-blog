import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import Page from '../components/Page';
import { getAccessToken } from '../lib/accessToken';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: 'include',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `bearer ${accessToken}`,
      },
    }));
  }
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: from([authMiddleware, httpLink]),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp;
