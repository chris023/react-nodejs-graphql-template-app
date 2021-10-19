import { RefreshTokenPayload } from 'utils'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createLoginTokens } from './createLoginTokens'
import { Scalars } from 'types'

const refreshTokens = (token: Scalars['JWT']) => {
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
