import { tokenExpirationLimits } from 'utils'
import jwt from 'jsonwebtoken'
import { Scalars, UserRole } from 'types'

export interface RegistrationTokenPayload {
    businessId: Scalars['ID']
    email: string
    roles: UserRole[]
}

const createRegistrationToken: (
    payload: RegistrationTokenPayload
) => Scalars['JWT'] = ({ businessId, email, roles }) => {
    const payload = { businessId, email, roles }
    const secret = process.env.SIGNUP_TOKEN_SECRET!
    const options = { expiresIn: tokenExpirationLimits.registrationToken }

    return jwt.sign(payload, secret, options)
}

export { createRegistrationToken }
