import jwt from 'jsonwebtoken'

import { createLoginTokens, RegistrationTokenPayload } from 'utils/tokens'
import { MutationResolvers } from 'types'

/**
 * Function used to register new users.  A registration token is required to create a new account
 */
const register: MutationResolvers['register'] = async (
    _parent,
    { email, password, timezone, registrationToken },
    { models }
) => {
    const { businessId, roles } = (await jwt.verify(
        registrationToken,
        process.env.SIGNUP_TOKEN_SECRET!
    )) as RegistrationTokenPayload

    const user = await models.User.create({
        password,
        email,
        roles,
        timezone,
        businessId,
    })

    return { user, tokens: createLoginTokens(user) }
}

export { register }
