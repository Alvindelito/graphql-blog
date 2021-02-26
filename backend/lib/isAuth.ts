import { verify } from "jsonwebtoken";

export const isAuth = (context) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload;
    return payload
  } catch (err) {
    console.log(err);
    throw new Error("not authenticated");
  }
}