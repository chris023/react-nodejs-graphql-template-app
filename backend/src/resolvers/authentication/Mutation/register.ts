import jwt from 'jsonwebtoken'

import {
    createLoginTokens,
    JsonWebToken,
    RegistrationTokenPayload,
} from 'utils/tokens'
import { IFieldResolver } from 'graphql-resolvers'
import { Context } from 'context'
import { ILoginResponse } from './login'

interface IArgs {
    email: string
    password: string
    timezone: string
    registrationToken: JsonWebToken
}

type IRegisterResponse = ILoginResponse

/**
 * Function used to register new users.  A registration token is required to create a new account
 */
const register: IFieldResolver<
    undefined,
    Context,
    IArgs,
    Promise<IRegisterResponse>
> = async (
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
