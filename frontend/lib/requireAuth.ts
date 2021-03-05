import cookie from 'cookie';
import decode from 'jwt-decode';
export default function requireAuthentication(gssp) {
  return async (context: any) => {
    const { req, res } = context;
    const cookies = cookie.parse(req.headers.cookie || '');
    const token: any = cookies.jid; // Add logic to extract token from `req.headers.cookie`
    // console.log('token', token);

    if (!token) {
      res.statusCode = 302;
      res.setHeader('Location', '/signin');
    }
    const { exp }: any = decode(token);

    if (Date.now() >= exp * 1000) {
      // Redirect to login page
      res.statusCode = 302;
      res.setHeader('Location', '/signin');
      // return;
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
