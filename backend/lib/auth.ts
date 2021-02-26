import { sign } from "jsonwebtoken"

// TODO: fix 'any' type of user
export const createAccessToken = (user: any) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m'
  })
}

export const createRefreshToken = (user: any) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d'
  })
}