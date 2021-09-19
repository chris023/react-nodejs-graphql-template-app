import jwt from 'jsonwebtoken'
import { User } from 'models/User'

const accessTokenExpiresIn = '15min'
const refreshTokenExpiresIn = '7d'
const signupTokenExpiresIn = '1d'

type Role = 'user'

interface AccessToken {
    id: string
    email: string
    businessId: string
    username: string
    roles: Role[]
}

const create: (arg0: User) => { refreshToken: string; accessToken: string } = ({
    id,
    email,
    businessId,
    username,
    roles,
}) => {
    const payload = { id, email, businessId, username, roles }

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: refreshTokenExpiresIn,
    })

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: accessTokenExpiresIn,
    })

    return { refreshToken, accessToken }
}

const refresh = (token) => {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    delete payload.iat
    delete payload.exp
    delete payload.nbf
    delete payload.jti

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: accessTokenExpiresIn,
    })
}

const generateSignUpToken = (organizationId, email, roles) => {
    return jwt.sign(
        { organizationId, email, roles },
        process.env.SIGNUP_TOKEN_SECRET,
        {
            expiresIn: signupTokenExpiresIn,
        }
    )
}

export default { create, generateSignUpToken, refresh }
