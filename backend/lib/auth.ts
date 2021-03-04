import { sign } from "jsonwebtoken"

// TODO: fix 'any' type of user
export const createAccessToken = (user: any) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '5s'
  })
}

export const createRefreshToken = (user: any) => {
  return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '15s'
  })
}