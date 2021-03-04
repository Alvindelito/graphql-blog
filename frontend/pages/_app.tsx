import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import { withApollo } from '../lib/withApollo';

function MyApp({ Component, pageProps, apolloClient }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// MyApp.getInitialProps = async function ({ Component, ctx }) {
//   let pageProps: any = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   pageProps.query = ctx.query;
//   return { pageProps };
// };

export default withApollo(MyApp);
