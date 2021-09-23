import { JsonWebToken, RefreshTokenPayload } from 'utils'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createLoginTokens } from './createLoginTokens'

const refreshTokens = (token: JsonWebToken) => {
    const payload = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload

    delete payload.iat
    delete payload.exp
    delete payload.nbf
    delete payload.jti

    return createLoginTokens(payload as RefreshTokenPayload)
}

export { refreshTokens }
