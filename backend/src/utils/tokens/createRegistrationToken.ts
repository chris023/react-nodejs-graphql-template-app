import { UserRole } from 'models/User'
import { JsonWebToken, tokenExpirationLimits, UUIDV4 } from 'utils'
import jwt from 'jsonwebtoken'

export interface RegistrationTokenPayload {
    businessId: UUIDV4
    email: string
    roles: UserRole[]
}

const createRegistrationToken: (
    payload: RegistrationTokenPayload
) => JsonWebToken = ({ businessId, email, roles }) => {
    const payload = { businessId, email, roles }
    const secret = process.env.SIGNUP_TOKEN_SECRET!
    const options = { expiresIn: tokenExpirationLimits.registrationToken }

    return jwt.sign(payload, secret, options)
}

export { createRegistrationToken }
