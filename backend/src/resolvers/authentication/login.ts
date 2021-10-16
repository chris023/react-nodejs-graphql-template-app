import { AuthenticationError } from 'apollo-server'

import { createLoginTokens } from 'utils/tokens'
import { MutationResolvers } from 'types'

/**
 * Function used to authenticate and log in users by email and password
 */
const login: MutationResolvers['login'] = async (
    _parent,
    { email, password },
    { models }
) => {
    const user = await models.User.findOne({ where: { email } })

    if (user) {
        const validPassword = await user.validatePassword(password)

        if (validPassword) {
            return { user, tokens: createLoginTokens(user) }
        }
    }

    throw new AuthenticationError('Invalid username or password.')
}

export { login }
