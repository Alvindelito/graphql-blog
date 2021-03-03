import { setAccessToken } from './accessToken';

export default function requireAuthentication(gssp) {
  return async (context) => {
    const { req, res } = context;
    const token: any = setAccessToken(req.headers.cookie); // Add logic to extract token from `req.headers.cookie`

    if (!token) {
      // Redirect to login page
      res.statusCode = 302;
      res.setHeader('Location', '/signin');
      return;
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
