import { IFieldResolver } from 'graphql-resolvers'
import { Context } from 'context'
import { UserRole } from 'models/User'
import { createRegistrationToken as create, JsonWebToken } from 'utils'

interface IArgs {
    email: string
    roles: UserRole[]
}

interface IResponse {
    token: JsonWebToken
}

const createRegistrationToken: IFieldResolver<
    undefined,
    Context,
    IArgs,
    IResponse
> = (_parent, { email, roles }, { requestor }) => ({
    token: create({ businessId: requestor.businessId, email, roles }),
})

export { createRegistrationToken }
