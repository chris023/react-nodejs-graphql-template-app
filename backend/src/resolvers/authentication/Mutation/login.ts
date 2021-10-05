import { AuthenticationError } from 'apollo-server'

import { IFieldResolver } from 'graphql-resolvers'
import { Context } from 'context'
import { createLoginTokens, LoginTokens } from 'utils/tokens'
import { User } from 'models/User'

interface IArgs {
    email: string
    password: string
}

export interface ILoginResponse {
    user: User
    tokens: LoginTokens
}

/**
 * Function used to authenticate and log in users by email and password
 */
const login: IFieldResolver<
    undefined,
    Context,
    IArgs,
    Promise<ILoginResponse>
> = async (_parent, { email, password }, { models }) => {
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
