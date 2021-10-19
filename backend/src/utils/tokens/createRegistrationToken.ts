import { tokenExpirationLimits } from 'utils'
import jwt from 'jsonwebtoken'
import { Role, Scalars } from 'types'

export interface RegistrationTokenPayload {
    businessId: Scalars['ID']
    email: Scalars['EmailAddress']
    role: Role
}

const createRegistrationToken: (
    payload: RegistrationTokenPayload
) => Scalars['JWT'] = ({ businessId, email, role }) => {
    const payload = { businessId, email, role }
    const secret = process.env.SIGNUP_TOKEN_SECRET!
    const options = { expiresIn: tokenExpirationLimits.registrationToken }

    return jwt.sign(payload, secret, options)
}

export { createRegistrationToken }
