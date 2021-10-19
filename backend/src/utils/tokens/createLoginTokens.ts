import { User } from 'models/User.model'
import { tokenExpirationLimits } from 'utils/tokens'
import jwt from 'jsonwebtoken'
import { Role, Scalars } from 'types'

export interface AccessTokenPayload {
    id: Scalars['UUID']
    email: Scalars['EmailAddress']
    businessId: string
    role: Role
}

export type RefreshTokenPayload = AccessTokenPayload

const createAccessToken = ({
    id,
    email,
    businessId,
    role,
}: User | RefreshTokenPayload) => {
    const payload: AccessTokenPayload = {
        id,
        email,
        businessId,
        role,
    }
    const secret = process.env.REFRESH_TOKEN_SECRET!
    const options = { expiresIn: tokenExpirationLimits.accessToken }

    return jwt.sign(payload, secret, options) as Scalars['JWT']
}

const createRefreshToken = ({
    id,
    email,
    businessId,
    role,
}: User | RefreshTokenPayload) => {
    const payload: RefreshTokenPayload = {
        id,
        email,
        businessId,
        role,
    }
    const secret = process.env.REFRESH_TOKEN_SECRET!
    const options = { expiresIn: tokenExpirationLimits.refreshToken }

    return jwt.sign(payload, secret, options) as Scalars['JWT']
}

export type LoginTokens = {
    refreshToken: Scalars['JWT']
    accessToken: Scalars['JWT']
}

const createLoginTokens: (user: User | RefreshTokenPayload) => LoginTokens = (
    user
) => ({
    refreshToken: createRefreshToken(user),
    accessToken: createAccessToken(user),
})

export { createLoginTokens }
