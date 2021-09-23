import { User, UserRole } from 'models/User'
import { JsonWebToken, UUIDV4, tokenExpirationLimits } from 'utils/tokens'
import jwt from 'jsonwebtoken'

export interface AccessTokenPayload {
    id: UUIDV4
    email: string
    businessId: string
    roles: UserRole[]
}

export type RefreshTokenPayload = AccessTokenPayload

const createAccessToken = ({
    id,
    email,
    businessId,
    roles,
}: User | RefreshTokenPayload) => {
    const payload: AccessTokenPayload = {
        id,
        email,
        businessId,
        roles,
    }
    const secret = process.env.REFRESH_TOKEN_SECRET!
    const options = { expiresIn: tokenExpirationLimits.accessToken }

    return jwt.sign(payload, secret, options) as JsonWebToken
}

const createRefreshToken = ({
    id,
    email,
    businessId,
    roles,
}: User | RefreshTokenPayload) => {
    const payload: RefreshTokenPayload = {
        id,
        email,
        businessId,
        roles,
    }
    const secret = process.env.REFRESH_TOKEN_SECRET!
    const options = { expiresIn: tokenExpirationLimits.refreshToken }

    return jwt.sign(payload, secret, options) as JsonWebToken
}

export type LoginTokens = {
    refreshToken: JsonWebToken
    accessToken: JsonWebToken
}

const createLoginTokens: (user: User | RefreshTokenPayload) => LoginTokens = (
    user
) => ({
    refreshToken: createRefreshToken(user),
    accessToken: createAccessToken(user),
})

export { createLoginTokens }
